import { ragChat } from '@/lib/rag-chat'
import React from 'react'
import { redis } from '@/lib/redis'
const Url = async (props) => {
    function reconstructedUrl(url) {
        const decodedComponents = url.map(
            (component) => decodeURIComponent(component)
        )
        // console.log(decodedComponents)
        return decodedComponents.join('/');
    }

    // console.log(typeof (props.params.url))
    const reUrl = reconstructedUrl(props.params.url)
    console.log("complete url is:", reUrl)


    

    const isAlreadyIndexed = await redis.sismember("indexed-urls", reUrl)

    const sessionId = "mock-session"
    console.log("isAlreeadyIndexed: ", isAlreadyIndexed);
      if(!isAlreadyIndexed){
    await ragChat.context.add(
        {
            type: "html",
            source: reUrl,
            config:{chunkOverlap:50, chunkSize:200},
        }
    )

    await redis.sadd("indexed-urls",reUrl)
 }
    return (<>
    <a href={reUrl} target='_blank'>{reUrl}</a>
    </>)
}

export default Url
