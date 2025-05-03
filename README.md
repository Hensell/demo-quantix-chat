# Quantix AI Chat Demo

A lightweight open-source demo showcasing how to build a chatbot UI integrated with OpenAI's Assistant API using **Next.js**, **React Hooks**, and **Cloudflare Workers**.

## 🚀 Features

- Stateless chat interface with persistent local history
- Assistant API integration via Cloudflare Workers
- Thread handling with automatic regeneration
- Built with Next.js 15 and TailwindCSS
- Clean separation of concerns (hook + UI)
- Ready for open source contributions

## 🧱 Stack

- **Next.js** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **OpenAI Assistant API**
- **Cloudflare Workers (API)**

## 📦 Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/quantix-chat-demo.git
cd quantix-chat-demo
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env.local` file in the root of your project. Use the provided `.env.local.example` as a template:

```bash
cp .env.local.example .env.local
```

Then fill in your API base URL:

```
NEXT_PUBLIC_QUANTIX_API_URL=https://your-cloudflare-worker-url.workers.dev
```

4. **Run the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the chat in action.

## 🧼 Code Structure

```
/app               → Main Next.js pages
/components        → Chat UI components
/hooks             → useChat.ts (state + API logic)
/utils             → Shared types and constants
/public            → Static assets (if needed)
```

## 🧠 About the API

This project consumes an open-source API deployed to Cloudflare Workers, which wraps OpenAI's Assistant API. It supports:

- Creating a thread: `GET /thread`
- Sending a message: `POST /chat`

You can find the Worker source code here: [GitHub Repository](https://github.com/Hensell/demo-quantix-chat)

## 📖 License

MIT

---

Made with ❤️ by [**Hensell**](https://hensell.dev)
