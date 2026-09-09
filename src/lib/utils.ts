import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name: string) {
  const letters = name.match(/\p{L}+/gu) ?? [];
  const short = letters
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
  return short || name.slice(0, 2).toUpperCase();
}
