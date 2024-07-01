"use client"
import React, { useState, useRef, useContext, useEffect } from "react";
import style from "@/app/css/player.module.css";
import Image from "next/image";
import { SongContext } from "./context/SongContextProvider";
import noImage from '@/public/no-image.webp'
import volMute from '@/public/volume-icon-mute.png'
import vol from '@/public/volume-icon.png'
// import { useRouter } from "next/navigation";
// import PlayerScreen from "./playerScreen";

const Player: React.FC<any> = () => {
  const [audioSrc, setAudioSrc] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volumeProgress, setVolumeProgress] = useState<number>(0.50);
  const [displayPlayerScreen, setDisplayPlayerScreen] = useState<boolean>(false);
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
    songRef.current!.play();
    progressRef.current!.max = songRef.current!.duration.toString();
    progressRef.current!.value = songRef.current!.currentTime.toString();
    setAudioReady(true)
    // songTimeUpdate()
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

      {currentSongData?.img || noImage && !displayPlayerScreen ?
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
  </>
  );
};

export default Player;

interface PlayerScreenProps {
  data: any;
  volumeProgress: number
  sendDataToParent: (data: any) => void;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ data, volumeProgress, sendDataToParent }) => {
  const [progress, setProgress] = useState<number>(volumeProgress);
  const svgRef = useRef<SVGSVGElement>(null);
  // const router = useRouter();

  useEffect(() => {
    sendDataToParent(progress);
  }, [progress])

  const handleMousePosition = (e: MouseEvent | TouchEvent) => {
    let x, y;
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (e.type === "touchmove" || e.type === "touchstart") {
      const touchEvent = e as TouchEvent;
      x = touchEvent.touches[0].clientX - centerX;
      y = touchEvent.touches[0].clientY - centerY;
    } else if (e.type === "mousemove" || e.type === "mousedown") {
      const mouseEvent = e as MouseEvent;
      x = mouseEvent.clientX - centerX;
      y = mouseEvent.clientY - centerY;
    }

    const angleRad = Math.atan2(Number(y), Number(x));
    let angleDeg = angleRad * (180 / Math.PI);
    angleDeg = angleDeg < 0 ? angleDeg + 360 : angleDeg;
    if (angleDeg >= 0 && angleDeg <= 180) {
      const progressPer = (angleDeg / 180);
      setProgress(1 - progressPer);
      // console.log("Progress percentage:", 1 - progressPer);
    }
  };

  const startTracking = (e: React.MouseEvent<SVGCircleElement> | React.TouchEvent<SVGCircleElement> | any) => {
    document.addEventListener("mousemove", handleMousePosition);
    document.addEventListener("touchmove", handleMousePosition);
    document.addEventListener("mouseup", stopTracking);
    document.addEventListener("touchend", stopTracking);
    handleMousePosition(e);
  };

  const stopTracking = () => {
    document.removeEventListener("mousemove", handleMousePosition);
    document.removeEventListener("touchmove", handleMousePosition);
    document.removeEventListener("mouseup", stopTracking);
    document.removeEventListener("touchend", stopTracking);
  };

  return (
    <div className={style.songImage}>
      <Image src={volMute} height={30} width={30} alt="mute" className={style.volMute} />
      <div>
        <Image
          height={200}
          width={200}
          src={data?.img.replace(/(\d+)\.jpg$/, "4.jpg") || noImage}
          alt={data?.name || "no image"}
        />
      </div>
      <svg width={340} height={340} ref={svgRef}>
        <circle cx={170} cy={170} r={140} className={style.circle1} />
        <circle
          cx={170}
          cy={170}
          r={140}
          className={style.circle2}
          style={{
            strokeDashoffset: `calc(880 - (880 * (${progress}/2)) )`
          }}
        />
        <circle
          cx={170}
          cy={170}
          r={140}
          className={style.circle3}
          onMouseDown={startTracking}
          onTouchStart={startTracking}
          onMouseLeave={stopTracking}
          onTouchEnd={startTracking}
        />
      </svg>

      <Image src={vol} height={30} width={30} alt="high volume" className={style.vol} />
    </div>
  );
};
