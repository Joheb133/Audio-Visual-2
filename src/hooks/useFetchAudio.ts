import { useState, useEffect } from "react"

export default function useFetchAudio(url: string) {
    const [audioData, setAudioData] = useState<any | null>(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const audioCtx = new AudioContext()
        const abortCtrl = new AbortController();

        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if (!res.ok) throw Error("Failed to fetch data")
                return res.arrayBuffer()
            })
            .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer), (error: Error) => {
                if (error.message !== 'The user aborted a request.') throw error
            })
            .then(audioBuffer => {
                setAudioData(audioBuffer)
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
    }, [])

    return { audioData, error, isPending }
}