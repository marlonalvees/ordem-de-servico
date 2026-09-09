"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminSession, requireHubSession } from "@/lib/hub-auth";
import { resolveDisplayName } from "@/lib/hub-users";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  TicketCategory,
  TicketPriority,
} from "@/types/ticket";

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Campo obrigatório ausente: ${key}`);
  }
  return value.trim();
}

export async function createTicket(formData: FormData) {
  const session = await requireHubSession();
  const requesterName = await resolveDisplayName(session);

  const branch = readString(formData, "branch");
  const sector = readString(formData, "sector");
  const category = readString(formData, "category") as TicketCategory;
  const description = readString(formData, "description");
  const priorityRaw = formData.get("priority");
  const priority = (typeof priorityRaw === "string" && priorityRaw
    ? priorityRaw
    : "normal") as TicketPriority;

  const { data, error } = await getSupabaseAdmin()
    .from("tickets")
    .insert({
      requester_user_id: session.userId,
      requester_name: requesterName,
      branch,
      sector,
      category,
      description,
      priority,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Não foi possível registrar o chamado.");
  }

  redirect(`/obrigado?id=${data.id}`);
}

export async function assignTicketToMe(ticketId: string, _formData: FormData) {
  const session = await requireAdminSession();
  const name = await resolveDisplayName(session);

  const { error } = await getSupabaseAdmin()
    .from("tickets")
    .update({
      assigned_to_user_id: session.userId,
      assigned_to_name: name,
      status: "em_atendimento",
    })
    .eq("id", ticketId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/painel/${ticketId}`);
  revalidatePath("/painel");
}

export async function updateTicketStatus(ticketId: string, formData: FormData) {
  await requireAdminSession();

  const status = readString(formData, "status") as
    | "aberto"
    | "em_atendimento"
    | "resolvido";
  const resolutionNote = (formData.get("resolution_note") as string | null)?.trim();

  if (status === "resolvido" && !resolutionNote) {
    throw new Error("Adicione uma nota de resolução antes de marcar como resolvido.");
  }

  const { error } = await getSupabaseAdmin()
    .from("tickets")
    .update({
      status,
      resolution_note: resolutionNote || null,
      resolved_at: status === "resolvido" ? new Date().toISOString() : null,
    })
    .eq("id", ticketId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/painel/${ticketId}`);
  revalidatePath("/painel");
}
