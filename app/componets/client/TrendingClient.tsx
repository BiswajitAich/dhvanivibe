"use client"
import { Key, useContext, useEffect, useState } from "react";
import Image from "next/image";
import style from "@/app/css/trending.module.css"
import playBtn from "@/public/play-button.webp"
import pauseBtn from "@/public/pause-button.webp"
import { SongContext } from "../context/SongContextProvider";
import noImage from "@/public/no-image.webp"
import useIntersectionObserver from "../js/useIntersectionObserver";
import LoadingComponent from "../LoadingComponent";

const TrendingClient = ({ fetchLoc, h }: { fetchLoc: any, h: string }) => {
    const [viralsData, setViralsData] = useState<any>()
    const [hoveredCard, setHoveredCard] = useState<boolean | Key>(false)
    const [playing, setPlaying] = useState<boolean | Key>(false)
    const { setCurrentSongData } = useContext<any>(SongContext)
    const [ref, isIntersecting] = useIntersectionObserver({
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    });
    const [loading, setLoading] = useState(true);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const fetchViralsData = async () => {
            try {
                const res = await fetch(`/api/fetchFeatured?location=${fetchLoc}`)
                const data = await res.json()
                console.log(data);
                setViralsData(data)
                setHasFetched(true);
            } catch (error) {
                console.error("Error fetching viral data:", error);
            } finally {
                setLoading(false);
            }
        }
        if (isIntersecting && !hasFetched) {
            fetchViralsData();
        }
    }, [isIntersecting]);

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
    return (<div ref={ref}>
        {viralsData && !loading ? <>
            <h2 className={style.h}>{h}</h2>
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
                            <Image src={trend.img.replace("_1.jpg", "_3.jpg")}
                                placeholder="blur"
                                blurDataURL={noImage.toString()}
                                onError={(e) => e.currentTarget.srcset = noImage.toString()}
                                height={200}
                                width={150}
                                style={{
                                    objectFit: 'cover'
                                }}
                                alt={trend.name}
                                loading="lazy" />
                        </div>
                        <div className={style.viral_p}>
                            <p>{trend.name}</p>
                            <p>{trend.singer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </> : <LoadingComponent />}
    </div>);
}

export default TrendingClient;