# Chamados T.I. — Novamix

Sistema simples para abertura e gestão de chamados de T.I., substituindo os pedidos de suporte por WhatsApp.

- Qualquer funcionário abre um chamado (nome, filial, setor, categoria, descrição).
- A equipe de T.I. gerencia os chamados num painel: assume, atualiza status (Aberto → Em Atendimento → Resolvido) e registra a resolução.
- Não há login próprio neste app — a autenticação é 100% delegada ao [hub-novamix](https://github.com/matheuscrvlh/hub-novamix), via o cookie `token` (JWT) que o hub já seta em `.lojanovamix.com.br`. Usuários com `role === 'admin'` no hub acessam o painel; qualquer outro usuário autenticado só abre chamados.

## Setup

1. **Supabase**: confirme o projeto e copie, em Settings → API, a *Project URL* e a **service_role key** (⚠️ chave sensível — nunca comitar nem expor no client).
2. Rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) no SQL Editor do Supabase.
3. Copie o `JWT_SECRET` do `.env` do servidor do hub-novamix — precisa ser **o mesmo valor** para este app conseguir validar o token.
4. Confirme a URL real de login do hub (`HUB_LOGIN_URL`) — usada para redirecionar quem não tem cookie válido.
5. (Opcional) Preencha `HUB_API_URL` com a base da API do hub, para o painel mostrar o nome real de quem assume um chamado (via `GET /users/me`). Sem isso, aparece "Usuário #<id>".
6. Copie `.env.local.example` para `.env.local` e preencha as variáveis.
7. `npm install`
8. `npm run dev`

## Deploy

Este app **precisa** rodar sob um subdomínio de `lojanovamix.com.br` (ex.: `chamados.lojanovamix.com.br`) — é isso que faz o browser enviar automaticamente o cookie `token` setado pelo hub. Fora desse domínio, ninguém consegue acessar (nem o form de abrir chamado, nem o painel), pois não há tela de login própria.

## Testando localmente sem estar sob o domínio do hub

Como `localhost` não recebe o cookie de `.lojanovamix.com.br`, gere um JWT de teste com o mesmo `JWT_SECRET` e defina-o manualmente como cookie `token` via DevTools do navegador em `http://localhost:3000`, por exemplo:

```json
{ "sub": 1, "role": "employee", "permissions": [], "branchs": [{ "id": 1, "name": "Matriz" }] }
```

Use `"role": "admin"` para testar o acesso ao painel em `/painel`.

## Escopo desta primeira versão

Sem notificações, sem SLA, sem relatórios avançados e sem integração com WhatsApp — fica para uma próxima fase.
