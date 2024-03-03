import React, { useState, useRef } from "react";
import style from "@/app/css/player.module.css";
import Image from "next/image";

const Player: React.FC<any> = ({ sondId, title, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState<number>(50);
  const [audioLength, setAudioLength] = useState<number>(0);
  const [currentTimeTrack, setCurrentTimeTrack] = useState<string>("(00:00)");
  const [currentTimeDuration, setCurrentTimeDuration] = useState<string>("(00:00)");
  const [songPosition, setSongPosition] = useState<number>(0);
  const [showSound, setShowSound] = useState<boolean>(false);
  const [topPosition0, setTopPosition0] = useState<string>("&#x25B2;");
  const audioRef = useRef<HTMLAudioElement>(null);


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
    setValue(normalizedValue * 100);
    (audioRef.current as HTMLAudioElement).volume = normalizedValue;
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
    setAudioLength(audioRef.current!.duration);
  };

  const handletopPosition0 = () => {
    if (topPosition0 === "&#x25B2;") {
      setTopPosition0("&#x25BC;")
    } else if (topPosition0 === "&#x25BC;") {
      setTopPosition0("&#x25B2;")
    }
  }

  return (
    <div className={style.playerContainer} style={{ top: topPosition0 === "&#x25B2;" ? "85dvh" : "0dvh" }}>
      <div className={style.playerBody} style={{ position: topPosition0 === "&#x25B2;" ? "unset" : "fixed" }}>
        <div className={style.songPosition}>
          <div className={style.songNameTime}>
            <p>{currentTimeTrack}</p>
            <p className={style.songName}>{title}</p>
            <p>{currentTimeDuration}</p>
            <button
              onClick={handletopPosition0}
              className={style.topPosition0}
            >
              {topPosition0 === "&#x25B2;" ? <>&#x25B2;</> : <>&#x25BC;</>}
            </button>
          </div>
          {title ? (
            <input
              type="range"
              min={0}
              max={audioLength}
              value={songPosition}
              onChange={(e) => handleSongPosition(e)}
            />
          ) : null}
        </div>

        <audio
          ref={audioRef}
          src={`${process.env.NEXT_PUBLIC_API}fetch?id=${sondId}`}
          autoPlay
          onTimeUpdate={songTimeUpdate}
          onLoad={handlePlayPause}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        // onError={}
        />


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
      <div className={style.displaySong}>
        <div className={style.displaySongDetails} style={{ backgroundImage: `url(${image || "https://raw.githubusercontent.com/BiswajitAich/lilastore/main/public/images/some/no-image.webp"})` }}>
          <div className={style.displaySongImg}>
            <div className={style.songImg}>
              <Image
                src={image || "https://raw.githubusercontent.com/BiswajitAich/lilastore/main/public/images/some/no-image.webp"}
                alt={title || "no image"}
                height={800}
                width={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
