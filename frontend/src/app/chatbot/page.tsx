"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

interface Message {
  sender: string;
  message: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]); // Start with an empty array
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messagesCid, setMessagesCid] = useState<string | null>(null);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    sendInitialMessage();
  }, []);

  const sendInitialMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/chat/initial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Let's start with some financial advice tailored to kids.",
          messagesCid: null,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch initial message");

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: "Advisor", message: data.message },
      ]);
      setMessagesCid(data.messagesCid);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        sender,
        message,
      },
    ]);
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const message = userInput.trim();
    addMessage("You", message);
    setUserInput("");
    setLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/chat/financial`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          messages: messages.map((msg) => ({
            role: msg.sender === "You" ? "user" : "assistant",
            content: msg.message,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch financial response");

      const data = await response.json();
      addMessage("Advisor", data.message);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Financial Advisor Chat</title>
      </Head>
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Personal Financial Advisor
          </h1>

          <div
            className="messages-container space-y-4 mb-4 overflow-y-auto"
            style={{ height: "calc(100vh - 200px)" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  msg.sender === "You" ? "bg-blue-50 ml-8" : "bg-gray-50 mr-8"
                }`}>
                <div className="font-semibold text-sm text-gray-600 mb-1">
                  {msg.sender}
                </div>
                <div className="text-gray-800">{msg.message}</div>
              </div>
            ))}
            {loading && (
              <div className="p-3 text-gray-500 animate-pulse">Thinking...</div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              id="user-input"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask your financial question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleUserInput();
              }}
            />
            <button
              onClick={handleUserInput}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
              disabled={loading}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
