"use client"
import React, { useState, useRef, useContext, useEffect } from "react";
import style from "@/app/css/player.module.css";
import Image from "next/image";
import { SongContext } from "./context/SongContextProvider";
import noImage from '@/public/no-image.webp'

const Player: React.FC<any> = () => {
  const [audioSrc, setAudioSrc] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioReady, setAudioReady] = useState<boolean>(false);
  const [currentTimeTrack, setCurrentTimeTrack] = useState<string>("(00:00)");
  const [currentTimeDuration, setCurrentTimeDuration] = useState<string>("(00:00)");
  const [songData, setSongData] = useState<any>();
  const { currentSongData } = useContext<any>(SongContext);
  const songRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = window.location.origin;
        const res = await fetch(`${base}/api/fetchAudioData?id=${currentSongData.songId}`)
        const data = await res.json()
        console.log(`${base}/api/fetchAudio?id=${currentSongData.songId}`);
        const audioSources = [data.audio].concat(data?.downloadData || []);
        const filteredSources = audioSources.filter(source => source);
        setAudioSrc(filteredSources);
        console.log("audio ___", filteredSources);
        setSongData(data)
      } catch (error) {
        setAudioSrc([])
      }
    }

    fetchData()
  }, [currentSongData])


  const handlePlayPause = () => {

    if (songRef.current) {
      if (isPlaying) {
        console.log("Pausing...");
        songRef.current.pause();
      } else {
        // progressRef.current!.value = songRef.current.currentTime.toString();
        console.log("Playing...");
        songRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleMeatData = () => {
    progressRef.current!.value = songRef.current!.currentTime.toString();
  }
  const handleSongPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    songRef.current?.play();
    songRef.current!.currentTime = Number(e.target.value);
    progressRef.current!.value = e.target.value
    // console.log(songRef.current?.currentTime);
    // console.log(Number(e.target.value));
  };

  const songTimeUpdate = () => {
    progressRef.current!.value = songRef.current!.currentTime.toString();
    const currentSeconds = Math.floor(songRef.current!.currentTime % 60);
    const currentMinutes = Math.floor(songRef.current!.currentTime / 60);
    const durationSeconds = Math.floor(songRef.current!.duration % 60);
    const durationMinutes = Math.floor(songRef.current!.duration / 60);

    const formatTime = (minutes: number, seconds: number) => {
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `(${formattedMinutes}:${formattedSeconds})`;
    };

    setCurrentTimeTrack(formatTime(currentMinutes, currentSeconds));
    setCurrentTimeDuration(formatTime(durationMinutes, durationSeconds));
  }
  useEffect(() => {
    if (audioSrc.length > 0) {
      sources();
      songRef.current?.load
    }
  }, [audioSrc])

  const sources = () => {
    for (let i = 0; i < audioSrc.length; i++) {
      const audio = new Audio(audioSrc[i]);
      audio.addEventListener("loadeddata", () => {
        if (progressRef.current) {
          progressRef.current.max = audio.duration.toString();
        }
        setAudioReady(true);
      });
      audio.addEventListener("error", () => {
        if (i < audioSrc.length - 1) {
          sources(); 
        }
      });
      return <source key={i} src={audioSrc[i]} type="audio/mpeg" />;
    }
    return null;
  };
  

  return (
    <div className={style.playerBody}>

      {audioSrc.length > 0 && (
        <audio
          ref={songRef}
          autoPlay
          onTimeUpdate={songTimeUpdate}
          onLoad={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onLoadedMetadata={handleMeatData}
          preload="metadata"
        >
          {sources()}
        </audio>
      )}

      {currentSongData?.img ?
        <Image className={style.image}
          src={currentSongData?.img || noImage}
          height={50}
          width={50}
          // objectFit="cover"
          alt={currentSongData?.name || "no image"} />
        : null
      }


      <div className={style.controls} >
        <div className={style.songPosition}>
          {currentSongData?.name ?
            <div className={style.songNameTime}>
              <p>{currentTimeTrack}</p>
              <p className={style.songName}>{currentSongData?.name}</p>
              <p>{currentTimeDuration}</p>
            </div> : null
          }
          <input
            id={style.progress}
            ref={progressRef}
            type="range"
            onChange={(e) => handleSongPosition(e)}
            className={!audioReady ? style.hide : ""}
            aria-label="audio progress bar"
          />
        </div>
        <div className={style.playBtns}>
          <button className={style.prevBtn} disabled>&#x25B6;|</button>
          <button className={style.playBtn} onClick={handlePlayPause} disabled={!audioReady}>
            {isPlaying ? "||" : <>&#x25B6;</>}
          </button>
          <button className={style.nextBtn} disabled>&#x25B6;|</button>

        </div>
      </div>
    </div>

  );
};

export default Player;
