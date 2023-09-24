# Audio-Visual-2
[Live demo](https://audio-visual-2-joheb133.vercel.app/)

This project is an improved version of (Audio-Visual)[https://github.com/Joheb133/Audio-Visual] built with React and Vercel. It lacks features I didn't have time to add but it's a huge step up from version 1.

[gif placeholder]

Some notable improvements are:
- Overall UI improvement
- Audio Seeking
- Audio visualization selector
- Ability to search songs (no need to grab link)
- Play songs straight from search results OR add to queue
- Drop music files (in case search doesn't work)
- x maybe ability to stream music x

### Frontend
TypeScript, React and tailwind

### Backend
Written in TypeScript. Ytdl-core & play-dl used to play and search music. Vercel serverless used run backend code.

## Instructions to run locally
Make sure [vercel CLI](https://vercel.com/docs/cli) is installed globally
```
npm install
vercel dev
```
