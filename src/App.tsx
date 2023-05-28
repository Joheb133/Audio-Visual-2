import "./index.css";
import PlayingBar from "./components/PlayingBar/PlayingBar";
import { useEffect, useState } from "react";
import useFetchAudio from "./hooks/useFetchAudio";

export interface AudioSettingsProp {
  audioCtx: AudioContext;
  gainNode: GainNode;
  source: AudioBufferSourceNode;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSettings, setAudioSettings] = useState<AudioSettingsProp | null>(
    null
  );
  const { data: audioData } = useFetchAudio("/test.mp3");

  useEffect(() => {
    if (!audioData) return;

    const audioCtx = new AudioContext();
    audioCtx.suspend();
    const gainNode = audioCtx.createGain();
    const source = audioCtx.createBufferSource();

    audioCtx.decodeAudioData(
      audioData,
      (buffer) => {
        source.buffer = buffer;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        source.start(audioCtx.currentTime, 0, buffer.duration);
      },
      (error) => {
        console.error("Error decoding audio:", error);
      }
    );

    setAudioSettings({ audioCtx, gainNode, source });

    return () => {
      source.stop();
      source.disconnect();
      gainNode.disconnect();
      audioCtx.close();
    };
  }, [audioData]);

  useEffect(() => {
    if (!audioSettings?.audioCtx) return;

    isPlaying
      ? audioSettings.audioCtx.resume()
      : audioSettings.audioCtx.suspend();
  }, [isPlaying]);

  return (
    <>
      <PlayingBar
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioSettings={audioSettings}
      />
    </>
  );
}
