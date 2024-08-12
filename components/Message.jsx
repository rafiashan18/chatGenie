"use client"
import { cn } from "@/lib/utils";
import { Bot, User, Copy, Check, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

export const Message = ({ content, isUserMessage }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const speakMessage = () => {
    if (speechSynthesis) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  return (
    <div  
      className={cn({
        "bg-zinc-800": isUserMessage,
        "bg-zinc-900": !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="max-w-3xl max-xl: flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 bg-zinc-900 flex justify-center items-center",
              {
                "bg-blue-950 border-blue-700 text-zinc-200": isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5 text-white" />
            )}
          </div>
          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Chat Genie"}
              </span>
              {!isUserMessage && (
                <>
                  <button
                    onClick={copyToClipboard}
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Copy message"
                  >
                    {isCopied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                  <button
                    onClick={speakMessage}
                    className={`text-gray-400 hover:text-white transition-colors ${isSpeaking ? 'text-blue-500' : ''}`}
                    title={isSpeaking ? "Stop speaking" : "Speak message"}
                  >
                    <Volume2 className="size-4" />
                  </button>
                </>
              )}
            </div>
            <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};