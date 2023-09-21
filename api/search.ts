import { VercelRequest, VercelResponse } from "@vercel/node";
import { search as ytSearch } from "play-dl"

export default async function search(req: VercelRequest, res: VercelResponse) {
    try {
        const reqQuery = req.query.v as string
        const rawList = await ytSearch(reqQuery, { source: { youtube: "video" }, limit: 20 })

        const cleanList = rawList
            .filter((video) => video.durationInSec <= 390) // Filter out elements with duration > 390
            .map((video) => ({
                //audioDataType #check types.ts file
                audioData: {
                    path: `api/audio?v=${video.id}`,
                },
                metaData: {
                    title: video.title,
                    duration: video.durationInSec,
                    imgUrl: video.thumbnails[0].url,
                    channel: video.channel?.name,
                    videoUrl: video.url,
                },
            }))

        res.status(200).json(cleanList)
    } catch (error) {
        res.status(500).json({ error })
    }
}