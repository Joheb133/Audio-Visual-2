import { useEffect, useState, useRef } from "react";
import useFetchAudio from "../../hooks/useFetchAudio";
import SongControls from "./SongControls";
import SongInfo from "./SongInfo";
import AudioControls from "./AudioControls";
import { AudioSettingsProp } from "../../App";
import { audioDataType } from "../../types";

interface PlayingBarProps {
  audioSettings: AudioSettingsProp | null;
  setAudioSettings: React.Dispatch<
    React.SetStateAction<AudioSettingsProp | null>
  >;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  queue: audioDataType[];
  queueIndex: number;
  setQueueIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function PlayingBar({
  audioSettings,
  setAudioSettings,
  isPlaying,
  setIsPlaying,
  queue,
  queueIndex,
  setQueueIndex,
}: PlayingBarProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [metaData, setMetaData] = useState<audioDataType["metaData"]>();

  const songOffsetRef = useRef(0);
  const songDurationRef = useRef(0);
  const songPlayingRef = useRef(true);
  const currentTimeRef = useRef(0);
  const startTime = useRef(0);
  const timeIntervalRef = useRef<any>(null);

  const { audioData } = useFetchAudio(queue[queueIndex]?.audioData.path);

  useEffect(() => {
    const buffer = queue[queueIndex]?.audioData.buffer;

    if (audioData) {
      setAudioBuffer(audioData);
    } else if (buffer) {
      setAudioBuffer(buffer);
    } else {
      console.log("No source");
    }

    if ((!isPlaying && audioData) || (!isPlaying && buffer)) setIsPlaying(true);
  }, [audioData, queue]);

  useEffect(() => {
    initSong(0);
    setMetaData(queue[queueIndex]?.metaData);
    songDurationRef.current = queue[queueIndex]?.metaData.duration;
  }, [audioBuffer]);

  //code to play audio using bufferSourceNode
  const initSong = (songStartTime: number) => {
    if (!audioBuffer || !audioSettings) return;

    const { audioCtx, gainNode, analyser, source: oldSource } = audioSettings;

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
    source.buffer = audioBuffer;
    source.start(audioCtx.currentTime, songStartTime, audioBuffer.duration);

    //store start time
    startTime.current = audioCtx.currentTime;
    songOffsetRef.current = songStartTime;

    //store source reference
    setAudioSettings((prevSettings) => ({
      ...(prevSettings as AudioSettingsProp),
      source: source,
    }));

    songPlayingRef.current = true;
  };

  //handle song ended
  function handleAudioEnded() {
    songPlayingRef.current = false;
    const list = queue;
    const currentIndex = queueIndex;

    if (currentIndex < list.length) {
      //play next song
      setQueueIndex((currentIndex) => currentIndex + 1);
    } else {
      //restart & pause current song
      setIsPlaying(false);
      initSong(0);
    }
  }

  //listen for playing + track elapsed time
  useEffect(() => {
    if (!audioSettings?.audioCtx) return;
    //update time elapsed
    let timeInterval = timeIntervalRef.current;
    const startInterval = () => {
      timeInterval = setInterval(() => {
        let preciseCurrentTime =
          audioSettings.audioCtx.currentTime +
          songOffsetRef.current -
          startTime.current;

        // round to 1s
        let roundedCurrentTime = Math.floor(preciseCurrentTime);

        //Has atleast 1s elapsed
        if (
          roundedCurrentTime !== currentTimeRef.current &&
          roundedCurrentTime <= songDurationRef.current
        ) {
          currentTimeRef.current = roundedCurrentTime;
          setCurrentTime(currentTimeRef.current);
        }

        //Has song ended?
        if (
          preciseCurrentTime >= songDurationRef.current &&
          songPlayingRef.current
        ) {
          handleAudioEnded();
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

  return (
    <div className="now-playing-bar flex items-center justify-center h-20 bg-neutral-950">
      <div className="flex text-white w-full">
        <SongInfo metaData={metaData} />
        <SongControls
          {...{
            isPlaying,
            setIsPlaying,
            queueIndex,
            maxQueueIndex: queue.length - 1,
            setQueueIndex,
            audioSettings,
            songDuration: metaData ? metaData.duration : 0,
            songTime: currentTime,
            initSong,
          }}
        />
        <AudioControls volumeControls={audioSettings?.gainNode} />
      </div>
    </div>
  );
}
