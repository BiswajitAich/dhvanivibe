import style from "@/app/css/player.module.css";
import React, { useEffect, useRef } from "react";

interface AudioProgressProps {
    audioReady: boolean;
    handleSongPosition: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleProgressRefChange: (ref: React.RefObject<HTMLInputElement>) => void;
}

const AudioProgress: React.FC<AudioProgressProps> = ({ audioReady, handleSongPosition, handleProgressRefChange }) => {
    const progressRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        handleProgressRefChange(progressRef);
    }, [handleProgressRefChange, progressRef]);

    return (
        <input
            id={style.progress}
            ref={progressRef}
            type="range"
            onChange={handleSongPosition}
            className={!audioReady ? style.hide : ""}
            aria-label="audio progress bar"
        />
    );
}

export default AudioProgress;
