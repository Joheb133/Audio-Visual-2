import ytdl from 'ytdl-core';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function audio(req: VercelRequest, res: VercelResponse) {
    try {
        // Return youtube video as audio
        const videoRequest = req.query.v
        const videoID = `https://www.youtube.com/watch?v=${videoRequest}`
        const info = await ytdl.getInfo(videoID);
        const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');

        res.setHeader('Content-Type', 'audio/mpeg');
        ytdl.downloadFromInfo(info, { format: audioFormats[0] }).pipe(res)
    } catch (error) {
        res.status(500).json({ error })
    }
}