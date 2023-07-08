export type audioDataType = {
    audioData: {
        path?: string,
        buffer?: AudioBuffer
    },
    metaData: {
        title: string,
        duration: number,
        imgUrl?: string,
        channel?: string,
        videoUrl?: string
    }
}