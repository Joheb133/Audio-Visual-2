import "./index.css";
import { useEffect, useState, useRef } from "react";
import useFetchAudio from "./hooks/useFetchAudio";
import audioList from "./audioList";
import { AudioControls, SongControls, SongInfo } from "./components/PlayingBar";

export interface AudioSettingsProp {
  audioCtx: AudioContext;
  gainNode: GainNode;
  source?: AudioBufferSourceNode;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [audioSettings, setAudioSettings] = useState<AudioSettingsProp | null>(
    null
  );
  const [isUserGesture, setIsUserGesture] = useState(false);

  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const currentTimeRef = useRef(0);
  const startTime = useRef(0);
  const timeElapsedRef = useRef<number | null>(null);

  const { audioData } = useFetchAudio(audioList[queueIndex], isUserGesture);

  //listen for user gesture
  useEffect(() => {
    const handlePointerEvent = () => {
      setIsUserGesture(true);
      //init web audio API stuff
      const audioCtx = new AudioContext();
      audioCtx.suspend();
      const gainNode = audioCtx.createGain();

      gainNode.connect(audioCtx.destination);

      setAudioSettings({ audioCtx, gainNode });
      window.removeEventListener("pointerdown", handlePointerEvent, true);
    };

    window.addEventListener("pointerdown", handlePointerEvent, true);
  }, []);

  //set audio source when given data
  useEffect(() => {
    if (!audioData || !audioSettings) return;

    const { audioCtx, gainNode, source: oldSource } = audioSettings;

    //clean old AudioBufferSourceNode
    if (oldSource) {
      oldSource.stop();
    }

    //store song duration
    setSongDuration(audioData.duration);

    //setup new AudioBufferSourceNode
    const source = audioCtx.createBufferSource();
    source.connect(gainNode);

    //start audio
    source.buffer = audioData;
    source.start(audioCtx.currentTime, 0, audioData.duration);

    //store start time
    startTime.current = audioCtx.currentTime;

    //store source reference
    setAudioSettings((prevSettings) => ({
      ...(prevSettings as AudioSettingsProp),
      source: source,
    }));
  }, [audioData]);

  //listen for playing + track elapsed time
  useEffect(() => {
    if (!audioSettings?.audioCtx || !audioSettings.source) return;

    //update time elapsed
    let timeElapsed = timeElapsedRef.current;
    const startInterval = () => {
      timeElapsed = setInterval(() => {
        let calCurrentTime = Math.floor(
          audioSettings.audioCtx.currentTime - startTime.current
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
      if (!timeElapsed) startInterval();
    } else {
      audioSettings.audioCtx.suspend();
      if (timeElapsed) {
        clearInterval(timeElapsed);
        timeElapsed = null;
      }
    }

    //update timeElapsedRef
    timeElapsedRef.current = timeElapsed;
  }, [isPlaying]);

  return (
    <>
      <div className="now-playing-bar flex items-center justify-center fixed bottom-0 w-screen h-20 bg-neutral-900">
        <div className="flex text-white w-full">
          <SongInfo />
          <SongControls
            {...{ isPlaying, setIsPlaying }}
            setQueueIndex={setQueueIndex}
            audioSettings={audioSettings}
            songDuration={songDuration}
            songTime={currentTime}
          />
          <AudioControls volumeControls={audioSettings?.gainNode} />
        </div>
      </div>
    </>
  );
}
