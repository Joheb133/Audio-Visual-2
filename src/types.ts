export type audioDataType = {
    audioData: {
        path?: string,
        buffer?: AudioBuffer
    },
    metaData: {
        title: string,
        duration: number,
        imgUrl?: string,
        channelUrl?: string,
        videoUrl?: string
    }
}