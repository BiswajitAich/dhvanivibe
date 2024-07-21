"use client"
import React, { useState, useRef, useContext, useEffect } from "react";
import style from "@/app/css/player.module.css";
// import styleh from '@/app/SavedList/css/card.module.css'
import Image from "next/image";
import { SongContext } from "../context/SongContextProvider";
import noImage from '@/public/no-image.webp'
// import { useRouter } from "next/navigation";
import PlayerScreen from "./PlayerScreen";
import AudioProgress from "./AudioProgress";

const Player: React.FC<any> = () => {
// const Player: React.FC<any> = ({sendToParent}) => {
  const [audioSrc, setAudioSrc] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volumeProgress, setVolumeProgress] = useState<number>(0.80);
  const [displayPlayerScreen, setDisplayPlayerScreen] = useState<boolean>(false);
  const [audioReady, setAudioReady] = useState<boolean>(false);
  const [currentTimeTrack, setCurrentTimeTrack] = useState<string>("(00:00)");
  const [currentTimeDuration, setCurrentTimeDuration] = useState<string>("(00:00)");
  const [songData, setSongData] = useState<any>();
  const { currentSongData } = useContext<any>(SongContext);
  const songRef = useRef<HTMLAudioElement>(null);
  const [progressRef, setProgressRef] = useState<React.RefObject<HTMLInputElement>>(useRef(null));
  // const [displayList, setDisplayList] = useState<boolean>(false);

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
        // console.log("audio ___", filteredSources);
        // console.log("audio ___", currentSongData);
        setSongData(data)
      } catch (error) {
        setAudioSrc([])
      }
    }

    fetchData()
    console.log("currentSongData Player component");
    
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
    songRef.current!.play();
    progressRef.current!.max = songRef.current!.duration.toString();
    progressRef.current!.value = songRef.current!.currentTime.toString();
    setAudioReady(true)
    // songTimeUpdate()
  }
  const handleSongPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (songRef.current) {
      songRef.current.pause();
      songRef.current.currentTime = Number(e.target.value);
      songRef.current.play();
    }
  };

  const songTimeUpdate = () => {
    progressRef.current!.value = songRef.current!.currentTime.toString();
    if (songRef.current?.duration && !isNaN(songRef.current.duration)) {
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
  };
  useEffect(() => {
    if (audioSrc.length > 0) {
      if (songRef.current?.paused === false) {
        songRef.current?.pause();
      }

      songRef.current?.load();
      songRef.current?.play();
    }
  }, [audioSrc])

  const handleDisplayPlayerScreen = () => {
    setDisplayPlayerScreen(!displayPlayerScreen)
  }

  useEffect(() => {
    if (displayPlayerScreen) document.documentElement.style.overflowY = 'hidden'
    else document.documentElement.style.overflowY = 'auto'
  }, [displayPlayerScreen])
  const handleDataFromChild = (data: number) => {
    setVolumeProgress(data);
  };

  useEffect(() => {
    if (songRef.current) {
      songRef.current.volume = Number(volumeProgress);
    }
  }, [volumeProgress])

  const handleProgressRefChange = (ref: React.RefObject<HTMLInputElement>) => {
    setProgressRef(ref);
  };
  // const handlelistDisplay = () => {
  //   setDisplayList((prev:boolean)=>!prev)
  //   sendToParent(displayList);
  // };

  return (<>
    {
      displayPlayerScreen ?
        <div className={style.playerScreen}>
          <div className={style.playerScreenHeader}>
            <button type="button" onClick={handleDisplayPlayerScreen}>&#10148;</button>
          </div>
          <PlayerScreen data={currentSongData} volumeProgress={volumeProgress} sendDataToParent={handleDataFromChild} />
        </div>
        : null
    }
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
          {audioSrc[0] ? <source key={0} src={audioSrc[0]} type="audio/mpeg" /> : null}
          {audioSrc[1] ? <source key={1} src={audioSrc[1]} type="audio/mpeg" /> : null}
        </audio>
      )}
      {/* 
      <button
        onClick={handleDisplayPlayerScreen}
        className={style.displayPlayerScreen}>
        &#10148;
      </button> */}

      {currentSongData?.img && !displayPlayerScreen ?
        <button onClick={handleDisplayPlayerScreen} className={style.image}>
          <Image
            src={currentSongData?.img || noImage}
            height={50}
            width={50}
            // objectFit="cover"
            alt={currentSongData?.name || "no image"} />
        </button>
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
          <AudioProgress
            audioReady={audioReady}
            handleSongPosition={handleSongPosition}
            handleProgressRefChange={handleProgressRefChange}
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




      {/* <button
        className={styleh.heartContainer}
        style={{
          bottom: "10px", right: "10px", padding: "unset"
        }}
        onClick={handlelistDisplay}
      >
        <div className={styleh.heart}
          style={{
            background: 'white'
          }}
        />
      </button> */}

    </div>
  </>
  );
};

export default Player;

