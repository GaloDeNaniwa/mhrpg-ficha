# MHRPG V2

App web para ficha automatizada, compêndio, modo combate e preparação para Vercel + Supabase.

## O que já vem pronto

- React + Vite hospedável na Vercel.
- Criador de personagem com classe, atributos, fisionomia, quirk e perícias.
- Ficha calculada: PV, CR, vigor, proficiência, ataque/CD de Quirk.
- Compêndio pesquisável em formato resumido e prático.
- Modo combate com PV, vigor, rolagens, condições, descanso e log local.
- Exportação/importação JSON.
- Schema Supabase com RLS, papéis, campanhas, fichas, compêndio e audit logs.
- Validações anti-burla no front-end e no banco.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy Vercel

1. Crie um repositório no GitHub e envie esta pasta.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Rode `supabase/schema.sql` no SQL Editor do Supabase.
5. Faça deploy.

## Anti-burla

O front-end não é autoridade final. Em modo campanha, o Supabase valida:

- dono da ficha;
- mestre da campanha;
- nível por XP;
- limite de atributos;
- limite de traços únicos;
- duplicidade de traços;
- formato de técnicas, itens e quirk;
- logs de alteração.

## Conteúdo do compêndio

O compêndio usa resumos práticos e dados estruturados. Ele não transcreve o PDF inteiro. Para completar o app, adicione mais entradas em `src/data/*.js` e depois migre para `rules_compendium` no Supabase.
