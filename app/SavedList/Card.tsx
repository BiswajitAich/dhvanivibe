import Image from "next/image";
import errImg from '@/public/no-image.webp'
import style from './css/card.module.css'
import React, { useContext, useState } from "react";
import { SongContext } from "../componets/context/SongContextProvider";
import useIndexedDB from "../js/useIndexedDB";
interface data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
interface CardProps {
    e: data,
}
const Card: React.FC<CardProps> = ({ e }) => {
    const { deleteItem, addItem } = useIndexedDB('songDatabase', 'likedSongs');
    const [clicked, setClicked] = useState<boolean>(false)
    const { setCurrentSongData } = useContext<any>(SongContext);


    const handleAddSong = (e: any) => {
        const data = {
            img: e.img,
            name: e.name,
            singer: e.singer,
            songId: e.songId
        }
        if (clicked) {
            deleteItem(e.songId)
            setClicked(false)
        } else {
            addItem(data)
            setClicked(true)
        }
    }

    const handleSongPlay = () => {
        console.log(e);
        setCurrentSongData((prev: any) => prev = e)
    }
    return (
        <div className={style.card}>
            <button className={style.button} onClick={handleSongPlay}>
                <div className={style.image}>
                    <Image height={100} width={100} src={e?.img || errImg} loading="lazy" alt={e.img || "error"} />
                </div>
                <p style={{ position: "unset" }}>{e?.name}</p>
            </button>
            <button
                // className={`${style.heartContainer} ${!isClicked[trend.songId] ? "" : style.clicked}`}
                className={`${style.heartContainer} `}
                onClick={() => handleAddSong(e)}
            >
                {/* <div className={`${style.heart} ${!hasInList[trend.songId] ? "" : style.red}`} /> */}
                <div className={`${style.heart} ${clicked ? '' : style.red}`} />
            </button>
        </div>
    );
}

export default Card;