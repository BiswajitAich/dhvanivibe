import React, { useState, useRef } from "react";
import style from "@/app/css/player.module.css";

const Player: React.FC<any> = ({ audioId, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState<number>(50);
  const [showSound, setShowSound] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    if (audioRef.current) {
      console.log(`${process.env.NEXT_PUBLIC_API}fetch?id=${audioId}`)
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


  return (
    <div className={style.playerBody}>
      <p className={style.songName}>{title}</p>

      {title ? (
        <div className={style.songPosition} />
      ) : null}


      <audio ref={audioRef} src={`${process.env.NEXT_PUBLIC_API}fetch?id=${audioId}`} autoPlay />

      <div className={style.playBtns}>
        <button className={style.prevBtn}>&#x25B6;|</button>
        <button className={style.playBtn} onClick={handlePlayPause}>
          {isPlaying ? "||" : <>&#x25B6;</>}
        </button>
        <button className={style.nextBtn}>&#x25B6;|</button>
        <button
          onClick={() => setShowSound(prev => !prev)}
          className={style.sound}
        >sound</button>
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
