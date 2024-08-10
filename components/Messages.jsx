import { MessageSquare } from "lucide-react";
import { Message } from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="flex max-h-[calc(100vh - 3.5rem - 7rem)] flex-1 flex-col overflow-y-auto">
      {messages.length ? (
        messages.map((message, i) => {
          return (
            <Message
              key={i}
              content={message.content}
              isUserMessage={message.role === "user"}
            />
          );
        })
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500 " />
          <h3 className="font-semibold text-white text-xl">You are all set!</h3>
          <p className="text-zinc-500 text-sm">Ask away to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
