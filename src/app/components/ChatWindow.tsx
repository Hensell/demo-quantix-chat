"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/app/hooks/useChat";
import { ChatMessage } from "@/app/utils/types";

export default function ChatWindow() {
  const { messages, loading, sendMessage, resetChat } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const renderMessage = (msg: ChatMessage) => (
    <div
      key={msg.id}
      className={`p-2 rounded-md max-w-[80%] whitespace-pre-line ${
        msg.sender === "user"
          ? "bg-black text-white self-end ml-auto"
          : "bg-gray-100 text-gray-900 self-start mr-auto"
      }`}
    >
      {msg.text}
    </div>
  );

  return (
    <div className="w-full max-w-xl bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col overflow-hidden h-[80vh]">
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Quantix AI Chat</h2>
        <button
          onClick={resetChat}
          className="text-xs border border-white px-2 py-1 rounded hover:bg-white hover:text-black transition"
        >
          Reiniciar
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm bg-white">
        {messages.map(renderMessage)}
        {loading && (
          <div className="bg-gray-100 text-gray-500 text-sm px-4 py-2 rounded-md w-fit animate-pulse">
            El asistente está escribiendo...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 flex gap-2">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí tu mensaje..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-black bg-gray-50"
            disabled={loading}
            maxLength={500}
          />
          <button
            type="submit"
            disabled={loading || input.trim() === ""}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      </div>
      <p className="ml-10 mb-1 text-xs text-gray-400 mt-1">
        {input.length} / 500
      </p>
    </div>
  );
}
