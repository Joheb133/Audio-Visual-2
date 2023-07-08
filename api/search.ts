import { VercelRequest, VercelResponse } from "@vercel/node";
import { search as ytSearch } from "play-dl"

export default async function search(req: VercelRequest, res: VercelResponse) {
    try {
        const reqQuery = req.query.v as string
        const rawList = await ytSearch(reqQuery, { source: { youtube: "video" }, limit: 20 })

        const cleanList = rawList
            .filter((video) => video.durationInSec <= 390) // Filter out elements with duration > 390
            .map((video) => ({
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
            .slice(0, 10); // Limit the number of videos to 10

        res.status(200).json(cleanList)
    } catch (error) {
        res.status(500).json({ error })
    }
}