import { useState, useEffect } from "react"

interface FetchAudioResult {
    data: any;
    error: any;
    isPending: boolean;
}

export default function useFetchAudio(url?: string): FetchAudioResult {
    const [data, setdata] = useState<any>();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);


    useEffect(() => {
        if (!url) return
        const abortCtrl = new AbortController();
        setIsPending(true)

        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if (!res.ok) throw Error("Failed to fetch data")
                return res.json()
            })
            .then(data => {
                setdata(data)
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
        }
    }, [url])

    return {
        data,
        error,
        isPending
    }
}