// export default [
//     "music/4rif - August (Lyric Video) prod. Wonderlust.mp3",
//     "music/d4vd - Poetic Vulgarity (Official Audio).mp3",
//     "music/FKJ - Just Piano (In partnership with Calm).mp3",
//     "/test.mp3",
//     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
//     "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3"
// ]

export type songDataType = {
    title: string;
    path: string
}

export const songDataList: songDataType[] = [
    {
        title: "4rif - August (Lyric Video) prod. Wonderlust.mp3",
        path: "music/4rif - August (Lyric Video) prod. Wonderlust.mp3"
    },
    {
        title: "d4vd - Poetic Vulgarity (Official Audio).mp3",
        path: "music/d4vd - Poetic Vulgarity (Official Audio).mp3"
    },
    {
        title: "FKJ - Just Piano (In partnership with Calm).mp3",
        path: "music/FKJ - Just Piano (In partnership with Calm).mp3"
    },
]