import React, { useState, useRef } from "react";
import style from "@/app/css/player.module.css";

const Player: React.FC<any> = ({ source, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
  

  return (
    <div className={style.playerBody}>
      <p className={style.songName}>{title}</p>
      <div className={style.songPosition}>
        <audio ref={audioRef} src={source?.response} autoPlay/>
      </div>
      <div className={style.playBtns}>
        <button className={style.prevBtn}>&#x25B6;|</button>
        <button className={style.playBtn} onClick={handlePlayPause}>
          {isPlaying ? "||" : <>&#x25B6;</>}
        </button>
        <button className={style.nextBtn}>&#x25B6;|</button>
      </div>
    </div>
  );
};

export default Player;
