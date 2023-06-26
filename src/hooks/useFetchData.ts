import { useState, useEffect } from "react"

export default function useFetchData(url: string, shouldFetch: boolean) {
    const [data, setData] = useState<any | null>(null)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        if (!shouldFetch) return
        const abortCtrl = new AbortController();

        fetch(url, { signal: abortCtrl.signal })
            .then(res => {
                if (!res.ok) throw Error("Failed to fetch data")
                setData(res)
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
    }, [url, shouldFetch])

    return { data, error, isPending }
}