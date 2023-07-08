//format seconds to 0:00
export default function formatSeconds(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    const formatedTime = s < 10 ? `${mins}:0${s}` : `${mins}:${s}`;

    return formatedTime;
}