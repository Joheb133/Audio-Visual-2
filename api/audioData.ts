import ytdl from 'ytdl-core'
// import fs from 'fs'
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function audio(req: VercelRequest, res: VercelResponse) {
    try {
        // Return youtube video metadata
        const videoRequest = req.query.v
        const videoID = `https://www.youtube.com/watch?v=${videoRequest}`
        const info = await ytdl.getInfo(videoID);
        const videoDetails = info.videoDetails

        const response = {
            title: videoDetails.title,
            channel: videoDetails.ownerChannelName,
            videoUrl: videoDetails.video_url,
            length: videoDetails.lengthSeconds,
            img: videoDetails.thumbnail.thumbnails[0]
        }

        res.status(200).json({ response })
    } catch (error) {
        res.status(500).json({ error })
    }
}