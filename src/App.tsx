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
  const [isUserGesture, setIsUserGesture] = useState(false);
  const { audioData } = useFetchAudio(audioList[queueIndex], isUserGesture);
  const [songDuration, setSongDuration] = useState(undefined);

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

    //store source reference
    setAudioSettings((prevSettings) => ({
      ...(prevSettings as AudioSettingsProp),
      source: source,
    }));
  }, [audioData]);

  //listen for playing
  useEffect(() => {
    if (!audioSettings?.audioCtx || !audioSettings.source) return;

    isPlaying
      ? audioSettings.audioCtx.resume()
      : audioSettings.audioCtx.suspend();
  }, [isPlaying]);

  //track time elapsed

  return (
    <>
      <PlayingBar
        {...{ isPlaying, setIsPlaying }}
        setQueueIndex={setQueueIndex}
        audioSettings={audioSettings}
        songDuration={songDuration}
      />
    </>
  );
}
