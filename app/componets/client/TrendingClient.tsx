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
import useIndexedDB from "../js/useIndexedDB";

interface data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
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
    const [isClicked, setIsClicked] = useState<{ [key: string]: boolean }>({});
    const [hasInList, setHasInList] = useState<{ [key: string]: boolean }>({});
    const { addItem, getAllItems, deleteItem, logAllItems, itemExists } = useIndexedDB('songDatabase', 'likedSongs');

    useEffect(() => {
        const fetchViralsData = async () => {
            try {
                const res = await fetch(`/api/fetchFeatured?location=${fetchLoc}`)
                const data = await res.json()
                // console.log(data);
                console.log(fetchLoc);
                setViralsData(data)
                setHasFetched(true);

                const songStatusPromises = data.map(async (song: data) => ({
                    [song.songId]: await itemExists(song.songId)
                }));
                const songStatus = await Promise.all(songStatusPromises);
                const songStatueMap = Object.assign({}, ...songStatus);
                setHasInList(songStatueMap);
            } catch (error) {
                console.error("Error fetching viral data:", error);
            } finally {
                setLoading(false);
            }
        }
        if (isIntersecting && !hasFetched) {
            fetchViralsData();
        }
    }, [isIntersecting, hasFetched, itemExists, fetchLoc]);

    const handleMouseEnter = (index: Key) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
    };

    const playPause = (idx: Key) => {
        playing === idx ? setPlaying(false) : setPlaying(idx);
        setCurrentSongData((prev: any) => prev = viralsData[Number(idx)])
        console.log("viralsData[Number(idx)]",viralsData[Number(idx)]);
    }

    const handleAddSong = async (d: data) => {
        if (await itemExists(d.songId)) {
            await deleteItem(d.songId);
            const newIsClicked = { ...isClicked, [d.songId]: false };
            const newHasInList = { ...hasInList, [d.songId]: false };
            setIsClicked(newIsClicked);
            setHasInList(newHasInList);
        } else {
            const newSong = {
                img: d.img,
                name: d.name,
                singer: d.singer,
                songId: d.songId
            };

            await addItem(newSong);
            const newIsClicked = { ...isClicked, [d.songId]: true };
            const newHasInList = { ...hasInList, [d.songId]: true };
            setIsClicked(newIsClicked);
            setHasInList(newHasInList);
        }
        await logAllItems()
    };


    return (<div ref={ref}>
        {viralsData && !loading ? <>
            <h2 className={style.h}>{h}</h2>
            <div className={style.viral_div}>
                {viralsData?.map((trend: data, idx: Key) => (
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
                        <button
                            className={`${style.heartContainer} ${!isClicked[trend.songId] ? "" : style.clicked}`}
                            onClick={() => handleAddSong(trend)}
                        >
                            <div className={`${style.heart} ${!hasInList[trend.songId] ? "" : style.red}`} />
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