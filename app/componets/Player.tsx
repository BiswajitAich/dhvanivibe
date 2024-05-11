"use client"
import React, { useState, useRef, useContext, useEffect } from "react";
import style from "@/app/css/player.module.css";
import Image from "next/image";
import { SongContext } from "./context/SongContextProvider";

const Player: React.FC<any> = () => {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState<number>(50);
  const [audioLength, setAudioLength] = useState<number>(0);
  const [currentTimeTrack, setCurrentTimeTrack] = useState<string>("(00:00)");
  const [currentTimeDuration, setCurrentTimeDuration] = useState<string>("(00:00)");
  const [songPosition, setSongPosition] = useState<number>(0);
  const [songData, setSongData] = useState<any>();
  const [showSound, setShowSound] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentSongData } = useContext<any>(SongContext);

  useEffect(() => {
    const fetchData = async () => {
      // console.log(currentSongData);

      try {
        const base = window.location.origin;
        const res = await fetch(`${base}/api/fetchAudioData?id=${currentSongData.songId}`)
        const data = await res.json()
        console.log(`${base}/api/fetchAudio?id=${currentSongData.songId}`);
        console.log("audio ___" + data);
        setAudioSrc(data.audio)
        setSongData(data)
      } catch (error) {
        setAudioSrc("")
      }
    }

    fetchData()
  }, [currentSongData])


  const handlePlayPause = () => {

    if (audioRef.current) {
      if (isPlaying) {
        console.log("Pausing...");
        audioRef.current.pause();
      } else {
        console.log("Playing...");
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = Number(e.target.value);
    const normalizedValue = Math.min(1, Math.max(0, rawValue / 100));
    setValue(Math.floor(normalizedValue * 100));
  };


  const handleSongPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const newPosition = Number(e.target.value);
    const newDuration = (newPosition / 100) * audioRef.current.duration;
    setSongPosition(newDuration);
    // console.log("newPosition",newPosition)
    (audioRef.current as HTMLAudioElement).currentTime = newDuration;
  };


  const songTimeUpdate = () => {
    if (!audioRef.current?.duration) return;

    const currentSeconds = Math.floor(audioRef.current!.currentTime % 60);
    const currentMinutes = Math.floor(audioRef.current!.currentTime / 60);
    const durationSeconds = Math.floor(audioRef.current!.duration % 60);
    const durationMinutes = Math.floor(audioRef.current!.duration / 60);

    const formatTime = (minutes: number, seconds: number) => {
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `(${formattedMinutes}:${formattedSeconds})`;
    };

    setCurrentTimeTrack(formatTime(currentMinutes, currentSeconds));
    setCurrentTimeDuration(formatTime(durationMinutes, durationSeconds));
    setSongPosition(audioRef.current!.currentTime);
    setAudioLength(audioRef.current.duration);
  };


  return (
    <div className={style.playerBody} >
      <div className={style.songPosition}>
        <div className={style.songNameTime}>
          <p>{currentTimeTrack}</p>
          <p className={style.songName}>{currentSongData?.name}</p>
          <p>{currentTimeDuration}</p>
        </div>
        {audioSrc ? (
          <input
            type="range"
            min={0}
            max={audioLength}
            value={songPosition}
            onChange={(e) => handleSongPosition(e)}
          />
        ) : null}
      </div>

      <audio controls
        ref={audioRef}
        autoPlay
        onTimeUpdate={songTimeUpdate}
        onLoad={handlePlayPause}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ display: 'none' }}
        preload="metadata"
      >
        <source src={audioSrc} type="audio/mpeg" />
        {Array.isArray(songData?.downloadData) && songData?.downloadData?.length > 0 && (
          <source src={songData?.downloadData[0]} type="audio/mpeg" />
        )}
      </audio>

      <div className={style.playBtns}>
        <button className={style.prevBtn}>&#x25B6;|</button>
        <button className={style.playBtn} onClick={handlePlayPause}>
          {isPlaying ? "||" : <>&#x25B6;</>}
        </button>
        <button className={style.nextBtn}>&#x25B6;|</button>
        <button
          onClick={() => setShowSound(prev => !prev)}
          className={style.sound}
        >&#128266;</button>
        {showSound ? (
          <div className={style.changeSound}>
            <input
              type="range"
              min={0}
              max={100}
              value={value}
              onChange={(e) => handleValue(e)}
            />
          </div>
        ) : null}

      </div>
    </div>

  );
};

export default Player;
