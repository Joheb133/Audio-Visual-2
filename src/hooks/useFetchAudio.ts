import { useState, useEffect } from "react"

export default function useFetchAudio(url: string) {
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const abortCtrl = new AbortController();

        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if (!res.ok) throw Error("Failed to fetch data")
                return res.arrayBuffer()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setIsPending(false)
                    setError(err.message)
                }
            })

        return () => abortCtrl.abort()
    }, [url])

    return { data, error, isPending }
}