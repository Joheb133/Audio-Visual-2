import { useState, useEffect } from "react"

interface FetchAudioResult {
    data: any;
    errorInfo: { isError: boolean, message: any };
    isPending: boolean;
}

export default function useFetchAudio(url?: string): FetchAudioResult {
    const [data, setdata] = useState<any>();
    const [errorInfo, setErrorInfo] = useState({ isError: false, message: null });
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
                setErrorInfo({ isError: false, message: null })
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                    setIsPending(false)
                } else {
                    setIsPending(false)
                    setErrorInfo({ isError: true, message: err.message })
                }
            })

        return () => {
            abortCtrl.abort()
        }
    }, [url])

    return {
        data,
        errorInfo,
        isPending
    }
}