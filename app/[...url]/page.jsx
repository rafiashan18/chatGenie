import { ragChat } from "@/lib/rag-chat";
import React from "react";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "@/components/ChatWrapper";

function reconstructedUrl(url) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  // console.log(decodedComponents)
  return decodedComponents.join("/");
}

const Url = async ({ params }) => {
  // console.log(typeof (props.params.url))
  const reUrl = reconstructedUrl(params.url);
  console.log("complete url is:", reUrl);

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reUrl);

  const sessionId = "mock-session";

  console.log("isAlreeadyIndexed: ", isAlreadyIndexed);
  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reUrl);
  }
  return <ChatWrapper sessionId={sessionId} /> ;
};

export default Url;
