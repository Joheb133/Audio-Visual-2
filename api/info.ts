import ytdl from 'ytdl-core'
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function info(req: VercelRequest, res: VercelResponse) {
    try {
        // Return youtube video metadata
        const videoRequest = req.query.v
        const videoID = `https://www.youtube.com/watch?v=${videoRequest}`
        const info = await ytdl.getBasicInfo(videoID);
        const videoDetails = info.videoDetails

        const video = {
            title: videoDetails.title,
            channel: videoDetails.ownerChannelName,
            videoUrl: videoDetails.video_url,
            length: videoDetails.lengthSeconds,
            img: videoDetails.thumbnails
        }

        res.status(200).json({ video })
    } catch (error) {
        res.status(500).json({ error })
    }
}