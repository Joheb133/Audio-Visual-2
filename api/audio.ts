import ytdl from 'ytdl-core'
// import fs from 'fs'
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function audio(req: VercelRequest, res: VercelResponse) {
    try {
        // Example of filtering the formats to audio only.
        let videoID = 'https://www.youtube.com/watch?v=HhDcrTmIcTI'
        let info = await ytdl.getInfo(videoID);
        let videoDetails = info.videoDetails
        // let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        // res.setHeader('Content-Type', 'audio/mpeg');
        //ytdl(videoID, { format: audioFormats[0] }).pipe(res)
        res.status(200).json({ title: videoDetails.title, length: videoDetails.lengthSeconds, channel: videoDetails.ownerChannelName, img: videoDetails.thumbnail.thumbnails[0] })
    } catch (error) {
        res.status(500).json({ error })
    }
}