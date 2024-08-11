import { ragChat } from "@/lib/rag-chat";
import React from "react";
import { redis } from "@/lib/redis";
import { ChatWrapper } from "@/components/ChatWrapper";
import { cookies } from "next/headers";

function reconstructedUrl(url) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );
  // console.log(decodedComponents)
  return decodedComponents.join("/");
}

const Url = async ({ params }) => {
  // console.log(typeof (props.params.url))
  const sessionCookie = cookies().get("sessionId") ?.value
  const reUrl = reconstructedUrl(params.url);
  console.log("complete url is:", reUrl);

  const sessionId = (reUrl + "--" + sessionCookie).replace(/\//g,"")

  const isAlreadyIndexed = await redis.sismember("indexed-urls", reUrl);

  const initialMessages = await ragChat.history.getMessages({
    amount:10, sessionId
  })
  console.log("isAlreeadyIndexed: ", isAlreadyIndexed);
  if (!isAlreadyIndexed) {
    await ragChat.context.add({
      type: "html",
      source: reUrl,
      config: { chunkOverlap: 50, chunkSize: 200 },
    });

    await redis.sadd("indexed-urls", reUrl);
  }
  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} /> ;
};

export default Url;
