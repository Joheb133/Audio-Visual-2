import "./index.css";
import { useEffect, useState } from "react";
import PlayingBar from "./components/PlayingBar/PlayingBar";
import useFetchAudio from "./hooks/useFetchAudio";
import audioList from "./audioList";

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
  const { audioData } = useFetchAudio(audioList[queueIndex]);

  // //init web audio API stuff
  useEffect(() => {
    const audioCtx = new AudioContext();
    audioCtx.suspend();
    const gainNode = audioCtx.createGain();

    gainNode.connect(audioCtx.destination);

    setAudioSettings({ audioCtx, gainNode });
  }, []);

  // //decode audio when given data
  useEffect(() => {
    if (!audioData || !audioSettings) return;

    const { audioCtx, gainNode, source: oldSource } = audioSettings;

    //clean old AudioBufferSourceNode
    if (oldSource) {
      oldSource.stop();
    }

    //setup new AudioBufferSourceNode
    const source = audioCtx.createBufferSource();
    source.connect(gainNode);
    setAudioSettings((prevSettings) => ({
      ...(prevSettings as AudioSettingsProp),
      source: source,
    }));

    source.buffer = audioData;
    source.start(audioCtx.currentTime, 0, audioData.duration);
  }, [audioData]);

  //listen for playing
  useEffect(() => {
    if (!audioSettings?.audioCtx) return;

    isPlaying
      ? audioSettings.audioCtx.resume()
      : audioSettings.audioCtx.suspend();
  }, [isPlaying]);

  return (
    <>
      {
        <PlayingBar
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setQueueIndex={setQueueIndex}
          audioSettings={audioSettings}
        />
      }
    </>
  );
}
