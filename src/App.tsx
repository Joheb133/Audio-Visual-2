import "./index.css";
import { useEffect, useState, useRef } from "react";
import useFetchAudio from "./hooks/useFetchAudio";
import audioList from "./audioList";
import { AudioControls, SongControls, SongInfo } from "./components/PlayingBar";
import Visualiser from "./components/Visualiser/Visualiser";

export interface AudioSettingsProp {
  audioCtx: AudioContext;
  gainNode: GainNode;
  analyser: AnalyserNode;
  source?: AudioBufferSourceNode;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [audioSettings, setAudioSettings] = useState<AudioSettingsProp | null>(
    null
  );
  const [isUserGesture, setIsUserGesture] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playback, setPlayback] = useState(0);
  const isSeekingRef = useRef(false);
  const songOffset = useRef(0);

  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const currentTimeRef = useRef(0);
  const startTime = useRef(0);
  const timeIntervalRef = useRef<number | null>(null);

  const { audioData } = useFetchAudio(audioList[queueIndex], isUserGesture);

  //code to play audio using bufferSourceNode
  const initSong = (songStartTime: number) => {
    if (!audioData || !audioSettings) return;

    const { audioCtx, gainNode, analyser, source: oldSource } = audioSettings;

    //store song duration
    setSongDuration(audioData.duration);

    //setup new AudioBufferSourceNode
    const source = audioCtx.createBufferSource();
    source.connect(gainNode);
    source.connect(analyser);

    //clean old AudioBufferSourceNode
    if (oldSource) {
      oldSource.stop();
      oldSource.disconnect();
    }

    //start audio
    source.buffer = audioData;
    source.start(audioCtx.currentTime, songStartTime, audioData.duration);

    //store start time
    startTime.current = audioCtx.currentTime;
    songOffset.current = songStartTime;

    //store source reference
    setAudioSettings((prevSettings) => ({
      ...(prevSettings as AudioSettingsProp),
      source: source,
    }));
  };

  //listen for user gesture
  useEffect(() => {
    const handlePointerEvent = () => {
      setIsUserGesture(true);
      //init web audio API stuff
      const audioCtx = new AudioContext();
      audioCtx.suspend();
      const gainNode = audioCtx.createGain();
      const analyser = new AnalyserNode(audioCtx, { fftSize: 1024 });

      gainNode.connect(audioCtx.destination);

      setAudioSettings({ audioCtx, gainNode, analyser });
      window.removeEventListener("pointerdown", handlePointerEvent, true);
    };

    window.addEventListener("pointerdown", handlePointerEvent, true);
  }, []);

  //set audio source when given data
  //this is the first time when playing the song
  useEffect(() => {
    initSong(0);
  }, [audioData]);

  //listen for playing + track elapsed time
  useEffect(() => {
    if (!audioSettings?.audioCtx || !audioSettings.source) return;

    //update time elapsed
    let timeInterval = timeIntervalRef.current;
    const startInterval = () => {
      timeInterval = setInterval(() => {
        let calCurrentTime = Math.floor(
          audioSettings.audioCtx.currentTime +
            songOffset.current -
            startTime.current
        );

        if (calCurrentTime !== currentTimeRef.current) {
          currentTimeRef.current = calCurrentTime;
          setCurrentTime(currentTimeRef.current);
        }
      }, 50);
    };

    //listen for playing
    if (isPlaying) {
      audioSettings.audioCtx.resume();
      if (!timeInterval) startInterval();
    } else {
      audioSettings.audioCtx.suspend();
      if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
      }
    }

    //update timeIntervalRef
    timeIntervalRef.current = timeInterval;
  }, [isPlaying]);

  //handle seeking
  useEffect(() => {
    if (isSeeking) {
      isSeekingRef.current = true;
    }

    if (!isSeeking && isSeekingRef.current) {
      const currentSeekTime = Math.floor(playback * songDuration);
      initSong(currentSeekTime);

      isSeekingRef.current = false;
    }
  }, [isSeeking]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Visualiser analyser={audioSettings?.analyser} />
        <div className="now-playing-bar flex items-center justify-center w-screen h-20 bg-neutral-900">
          <div className="flex text-white w-full">
            <SongInfo />
            <SongControls
              {...{
                isPlaying,
                setIsPlaying,
                isDragging: isSeeking,
                setIsDragging: setIsSeeking,
                playback,
                setPlayback,
                setQueueIndex,
                audioSettings,
                songDuration,
                songTime: currentTime,
              }}
            />
            <AudioControls volumeControls={audioSettings?.gainNode} />
          </div>
        </div>
      </div>
    </>
  );
}
