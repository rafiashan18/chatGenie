"use client";
import { Button, Textarea } from "@nextui-org/react";
import { Send, Mic } from "lucide-react";

const ChatInput = ({ input, handleInputChange, handleSubmit, setInput }) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
      setInput("");
    }} className="flex items-center space-x-2">
      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
            setInput("");
          }
        }}
        className="flex-1 resize-none bg-zinc-800 hover:bg-zinc-900 rounded-xl text-base  min-h-[50px]"
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2">
        <Send size={20} />
      </Button>
    </form>
  );
};

export default ChatInput;