import { useEffect, useState, useRef } from "react";
import useFetchAudio from "../../hooks/useFetchAudio";
import SongControls from "./SongControls";
import SongInfo from "./SongInfo";
import AudioControls from "./AudioControls";
import { AudioSettingsProp } from "../../App";
import audioList from "../../audioList";

interface PlayingBarProps {
  audioSettings: AudioSettingsProp | null;
  setAudioSettings: React.Dispatch<
    React.SetStateAction<AudioSettingsProp | null>
  >;
  isUserGesture: boolean;
  songInfo: any;
}

export default function PlayingBar({
  audioSettings,
  setAudioSettings,
  isUserGesture,
  songInfo,
}: PlayingBarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [playback, setPlayback] = useState(0);
  const isSeekingRef = useRef(false);
  const songOffset = useRef(0);

  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const currentTimeRef = useRef(0);
  const startTime = useRef(0);
  const timeIntervalRef = useRef<any>(null);

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
    <div className="now-playing-bar flex items-center justify-center h-20 bg-neutral-950">
      <div className="flex text-white w-full">
        <SongInfo songInfo={songInfo} />
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
  );
}
