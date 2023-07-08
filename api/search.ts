import { VercelRequest, VercelResponse } from "@vercel/node";
import { search as ytSearch } from "play-dl"

export default async function search(req: VercelRequest, res: VercelResponse) {
    try {
        const reqQuery = req.query.v as string
        const rawList = await ytSearch(reqQuery, { source: { youtube: "video" }, limit: 10 })

        const cleanList = rawList.map((video) => ({
            audioData: {
                path: `api/audio?v=${video.id}`
            },
            metaData: {
                title: video.title,
                duration: video.durationInSec,
                imgUrl: video.thumbnails[0].url,
                channel: video.channel?.name,
                videoUrl: video.url
            }
        }))
        res.status(200).json(cleanList)
    } catch (error) {
        res.status(500).json({ error })
    }
}