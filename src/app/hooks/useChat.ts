import { useEffect, useState } from "react";
import { ChatMessage } from "@/app/utils/types";

const LOCAL_MESSAGES_KEY = "demo_quantix_chat_messages";
const LOCAL_THREAD_KEY = "demo_quantix_chat_thread_id";
const API_BASE = process.env.NEXT_PUBLIC_QUANTIX_API_URL!;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Recuperar historial de localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_MESSAGES_KEY);
    const savedThread = localStorage.getItem(LOCAL_THREAD_KEY);

    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedThread) {
      setThreadId(savedThread);
    } else {
      createThread();
    }
  }, []);

  const createThread = async () => {
    try {
      const res = await fetch(`${API_BASE}/thread`);
      const data = await res.json();
      localStorage.setItem(LOCAL_THREAD_KEY, data.thread_id);
      setThreadId(data.thread_id);
    } catch (err) {
      console.error("Error creando thread:", err);
    }
  };

  const saveMessages = (newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(newMessages));
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || text.length > 500) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: text.trim(),
    };

    const newMsgs = [...messages, userMsg];
    saveMessages(newMsgs);
    setLoading(true);

    const success = threadId ? await trySend(text, threadId, newMsgs) : false;

    if (!success) {
      await createThread();
      const newTid = localStorage.getItem(LOCAL_THREAD_KEY);
      if (newTid) await trySend(text, newTid, [...newMsgs]);
    }

    setLoading(false);
  };

  const trySend = async (
    text: string,
    tid: string,
    currentMessages: ChatMessage[]
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, thread_id: tid, limit: 1 }),
      });

      const data = await res.json();

      if (data?.error?.includes("No thread found")) return false;

      const botText = data[0]?.content || "No hubo respuesta.";
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: botText,
      };

      saveMessages([...currentMessages, botMsg]);
      return true;
    } catch (err) {
      console.error("Error al enviar:", err);
      return true;
    }
  };

  const resetChat = () => {
    setMessages([]);
    setThreadId(null);
    localStorage.removeItem(LOCAL_MESSAGES_KEY);
    localStorage.removeItem(LOCAL_THREAD_KEY);
    createThread();
  };

  return {
    messages,
    loading,
    sendMessage,
    resetChat,
  };
}
