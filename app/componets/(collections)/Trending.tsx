"use client"
import { Key, useContext, useEffect, useState } from "react";
import Image from "next/image";
import style from "@/app/css/trending.module.css"
import playBtn from "@/public/play-button.webp"
import pauseBtn from "@/public/pause-button.webp"
import { SongContext } from "../context/SongContextProvider";


const Album = () => {
    const [viralsData, setViralsData] = useState<any>()
    const [hoveredCard, setHoveredCard] = useState<boolean | Key>(false)
    const [playing, setPlaying] = useState<boolean | Key>(false)
    const { setCurrentSongData } = useContext<any>(SongContext)

    useEffect(() => {

        const fetchViralsData = async () => {
            try {
                const res = await fetch("/api/fetchViral")
                const data = await res.json()
                console.log(data);
                setViralsData(data)
            } catch (error) {
                console.error("Error fetching viral data:", error);
            }

        }
        fetchViralsData();
    }, []);
    const handleMouseEnter = (index: Key) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {

        setHoveredCard(false);
    };

    const playPause = (idx: Key) => {
        playing === idx ? setPlaying(false) : setPlaying(idx);
        setCurrentSongData((prev: any) => prev = viralsData[Number(idx)])
        console.log(viralsData[Number(idx)]);
        
    }
    return (<>
        <h2 className={style.h}>Top Viral Songs</h2>
        <div className={style.viral_div}>
            {viralsData?.map((trend: any, idx: Key) => (
                <div key={idx} className={style.viral_card}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave()}
                >
                    <button className={`${style.viral_card_play} ${hoveredCard === idx || playing === idx ? style.show : style.hide}`} 
                    onClick={() => playPause(idx)}>
                        {playing === idx ?
                            <Image src={pauseBtn} height={100} width={100} alt={`Play ${trend.name}`} />
                            :
                            <Image src={playBtn} height={100} width={100} alt={`Play ${trend.name}`} />
                        }
                    </button>
                    <div className={style.viral_t}>
                        <Image src={trend.img} width={200} height={220} alt={trend.name} />
                    </div>
                    <div className={style.viral_p}>
                        <p>{trend.name}</p>
                        <p>{trend.singer}</p>
                    </div>
                </div>
            ))}
        </div>
    </>);
}

export default Album;