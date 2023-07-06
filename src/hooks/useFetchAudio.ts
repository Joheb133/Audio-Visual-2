import { useState, useEffect } from "react"

interface FetchAudioResult {
    audioData?: AudioBuffer;
    error: any;
    isPending: boolean;
}

export default function useFetchAudio(url: string | undefined): FetchAudioResult {
    const [audioData, setAudioData] = useState<AudioBuffer | undefined>();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (!url) {
            setAudioData(undefined)
            return
        }
        const audioCtx = new AudioContext()
        const abortCtrl = new AbortController();
        setIsPending(true)

        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if (!res.ok) throw Error("Failed to fetch data")
                return res.arrayBuffer()
            })
            .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer), (error: Error) => {
                if (error.message !== 'The user aborted a request.') throw error
            })
            .then(audioBuffer => {
                const buffer = audioBuffer as AudioBuffer
                setAudioData(buffer)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
            })

        return () => {
            abortCtrl.abort()
            audioCtx.close()
        }
    }, [url])

    return {
        audioData,
        error,
        isPending
    }
}