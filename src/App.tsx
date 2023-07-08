import "./index.css";
import { useEffect, useState, useRef } from "react";
import Visualiser from "./components/Visualiser/Visualiser";
import SideBar from "./components/SideBar/SideBar";
import PlayingBar from "./components/PlayingBar/PlayingBar";
import { audioDataType } from "./types";

export interface AudioSettingsProp {
  audioCtx: AudioContext;
  gainNode: GainNode;
  analyser: AnalyserNode;
  source?: AudioBufferSourceNode;
}

export default function App() {
  const [audioSettings, setAudioSettings] = useState<AudioSettingsProp | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<audioDataType[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);

  //listen for user gesture
  useEffect(() => {
    const handlePointerEvent = () => {
      //init web audio API stuff
      const audioCtx = new AudioContext();
      audioCtx.suspend();
      const gainNode = audioCtx.createGain();
      const analyser = new AnalyserNode(audioCtx);

      gainNode.connect(audioCtx.destination);

      setAudioSettings({ audioCtx, gainNode, analyser });
      window.removeEventListener("pointerdown", handlePointerEvent, true);
    };

    window.addEventListener("pointerdown", handlePointerEvent, true);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen min-w-[700px] px-2 pt-2 bg-neutral-950">
        <div className="flex flex-row flex-grow">
          <SideBar
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioSettings={audioSettings}
            queue={queue}
            setQueue={setQueue}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
          />
          <Visualiser analyser={audioSettings?.analyser} />
        </div>
        <PlayingBar
          audioSettings={audioSettings}
          setAudioSettings={setAudioSettings}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          queue={queue}
          queueIndex={queueIndex}
          setQueueIndex={setQueueIndex}
        />
      </div>
    </>
  );
}
