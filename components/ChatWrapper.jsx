"use client";
import { useChat } from "ai/react";
import Messages from "./Messages";
import ChatInput from "./chatInput";
import { useRef, useEffect } from "react";

export const ChatWrapper = ({ sessionId, initialMessages }) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } = useChat({
    api: "/api/chat-stream",
    body: { sessionId },
    initialMessages,
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        <Messages messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
        />
      </div>
    </div>
  );
};