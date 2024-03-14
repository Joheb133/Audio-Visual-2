# Audio-Visual-2
[Live demo](https://audio-visual-2-joheb133.vercel.app/)

This project is an improved version of [Audio-Visual](https://github.com/Joheb133/Audio-Visual) built with React powered by Vercel Serverless functions. 

![](https://raw.githubusercontent.com/Joheb133/Audio-Visual-2/main/images/audio-visualiser-2.gif)

Some notable improvements are:
- Overall UI improvement
- Audio Seeking
- Audio visualization selector
- Ability to search songs (no need to grab link)
- Play songs straight from search results OR add to queue
- Drop music files (in case search doesn't work)

### Frontend
Built with React, TypeScript and TailwindCSS. The graphical visualisations are made using Web Audio API in conjunction with HTML Canvas. 

### Backend
Written in TypeScript and uses Vercel Serverless infrasucture. The library Ytdl-core is used to stream audio & play-dl is used to search for music.

## Instructions to run locally
Make sure [vercel CLI](https://vercel.com/docs/cli) is installed globally. You'll probably have to login to vercel and push the project to vercel to run `vercel dev`, just follow the prompts given after running `vercel dev`.
```
npm install
vercel dev
```
