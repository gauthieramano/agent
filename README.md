# Agent

Full-stack app with a chat interface powered by an LLM agent capable of running Python code when needed.

The latest version of the application is deployed here via Vercel:
https://agent.proj9ct.com

## Quick start

First, you have to create at the root directory a `.env.local` file duplicating `.env.example` and putting a proper OpenAI API Key for `OPENAI_API_KEY`

Then, you have to install the project with `Node.js 20.9` or later _(the `v24.11 (LTS)` is recommanded)_:

```sh
npm i
```

Then, it is recommanded to build the application and run it in Production mode _(for a better user experience)_:

```sh
npm run build
npm run start
```

But instead, you can also run the development server:

```sh
npm run dev
```

In both cases, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The `OPENAI_API_KEY` environment variable is required to deploy this application.

As this application is a Next.js one, the easiest way to deploy it is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Linting with Biome

To check if all the files are correctly linted, run this command:

```sh
npm run lint
```

To format all the files, run this command:

```sh
npm run format
```

## Technologies

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It uses:

- [TypeScript](https://www.typescriptlang.org) _(v5)_
- [React](https://react.dev) _(v19)_
- [Next.js](https://nextjs.org) _(v16)_
- [Vercel AI SDK](https://ai-sdk.dev) _(v6 beta)_ with [@ai-sdk/openai](https://www.npmjs.com/package/@ai-sdk/openai)
- [Tailwind CSS](https://tailwindcss.com) _(v4)_
- [shadcn/ui](https://ui.shadcn.com)
- [AI Elements](https://ai-sdk.dev/elements)
- [Zod](https://zod.dev) _(v4)_
- [Biome](https://biomejs.dev) _(v2)_
- [Pyodide](https://pyodide.org/) _(v0.29)_
