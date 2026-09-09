# Chamados T.I. — Novamix

Sistema simples para abertura e gestão de chamados de T.I., substituindo os pedidos de suporte por WhatsApp.

- Não há login próprio neste app — a autenticação é 100% delegada ao [hub-novamix](https://github.com/matheuscrvlh/hub-novamix), via o cookie `token` (JWT) que o hub já seta em `.lojanovamix.com.br`. O nome do solicitante/atendente vem do próprio token (`sub` + `GET /users/me` do hub), nunca é digitado à mão.
- O slug deste módulo no hub é `os`, com dois níveis de acesso (`permissions[].access`):
  - **`user`**: abre chamados (nome, filial, setor, categoria, descrição) e acompanha os próprios em "Meus chamados".
  - **`admin`**: tudo o que `user` faz, mais o painel (`/painel`) — vê todos os chamados, assume, atualiza status (Aberto → Em Atendimento → Resolvido) e registra a resolução.
- Quem não tem nenhuma permissão no módulo `os` é redirecionado para `/acesso-negado` — o app inteiro é fechado, não só o painel.

## Setup

1. **Supabase**: confirme o projeto e copie, em Settings → API, a *Project URL* e a **service_role key** (⚠️ chave sensível — nunca comitar nem expor no client).
2. Rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor do Supabase.
3. Copie o `JWT_SECRET` do `.env` do servidor do hub-novamix — precisa ser **o mesmo valor** para este app conseguir validar o token.
4. Confirme a URL real de login do hub (`HUB_LOGIN_URL`) — usada para redirecionar quem não tem cookie válido. É a URL do app do hub (`https://hub.lojanovamix.com.br/login`), não o site institucional (`lojanovamix.com.br`).
5. (Opcional) Preencha `HUB_API_URL` com a base da API do hub, para o painel mostrar o nome real de quem assume um chamado (via `GET /users/me`). Sem isso, aparece "Usuário #<id>".
6. Copie `.env.local.example` para `.env.local` e preencha as variáveis.
7. `npm install`
8. `npm run dev`

## Deploy

Este app **precisa** rodar sob um subdomínio de `lojanovamix.com.br` (ex.: `chamados.lojanovamix.com.br`) — é isso que faz o browser enviar automaticamente o cookie `token` setado pelo hub. Fora desse domínio, ninguém consegue acessar (nem o form de abrir chamado, nem o painel), pois não há tela de login própria.

## Testando localmente sem estar sob o domínio do hub

Como `localhost` não recebe o cookie de `.lojanovamix.com.br`, gere um JWT de teste com o mesmo `JWT_SECRET` e defina-o manualmente como cookie `token` via DevTools do navegador em `http://localhost:3000`. Sem a permissão do módulo `os` no payload, o proxy redireciona tudo para `/acesso-negado` — inclua sempre `permissions`, por exemplo para um usuário comum:

```json
{
  "sub": 1,
  "permissions": [{ "module": "os", "access": "user" }],
  "branchs": [{ "id": 1, "name": "Matriz" }]
}
```

Para testar o painel em `/painel`, use `access: "admin"`:

```json
{
  "sub": 1,
  "permissions": [{ "module": "os", "access": "admin" }],
  "branchs": [{ "id": 1, "name": "Matriz" }]
}
```

## Escopo desta primeira versão

Sem notificações, sem SLA, sem relatórios avançados e sem integração com WhatsApp — fica para uma próxima fase.
