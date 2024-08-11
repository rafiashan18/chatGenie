"use client";
import { useChat } from "ai/react";
import Messages from "./Messages";
import ChatInput from "./chatInput";
import { useRef, useEffect } from "react";

export const ChatWrapper = ({ sessionId, initialMessages }) => {
  const { messages, handleInputChange, handleSubmit, input, setInput, isLoading } = useChat({
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
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        <Messages messages={messages} />
        {isLoading && (
          <div className="flex items-center space-x-2 p-4 bg-zinc-800 rounded-lg">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
            <span className="text-gray-300">Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setInput={setInput}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};