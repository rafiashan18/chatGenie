import { ragChat } from "@/lib/rag-chat";
import { aiUseChatAdapter } from "@upstash/rag-chat/nextjs";

export const POST = async (req, res) => {
  const { messages, sessionId } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  const resp = await ragChat.chat(lastMessage, { sessionId, streaming: true });

  return aiUseChatAdapter(resp);
};
