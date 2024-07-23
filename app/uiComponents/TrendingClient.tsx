"use client"
import React, { Key, useContext, useEffect, useState } from "react";
import Image from "next/image";
import style from "@/app/css/trending.module.css"
import playBtn from "@/public/play-button.webp"
import pauseBtn from "@/public/pause-button.webp"
import noImage from "@/public/no-image.webp"
import useIntersectionObserver from "../js/useIntersectionObserver";
import useIndexedDB from "../js/useIndexedDB";
import { PagePathContext } from "../componets/context/PathContextProvider";
import { SongContext } from "../componets/context/SongContextProvider";
import LoadingComponent from "../componets/LoadingComponent";
import useCustomNavigation from "../js/useCustomNavigation";

interface Data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
interface Props {
    data: any;
    h: string;
    path: string;
    handleIntersection: (e: boolean) => void;
    endPoint: string;
}

const TrendingClient: React.FC<Props> = ({ data, h, path, handleIntersection, endPoint }) => {
    const [viralsData, setViralsData] = useState<any>()
    const [fetched, setFetched] = useState<boolean>(false)
    const [hoveredCard, setHoveredCard] = useState<boolean | Key>(false)
    const [playing, setPlaying] = useState<boolean | Key>(false)
    const { setCurrentSongData } = useContext<any>(SongContext)
    const { setEndPoint, setPageDataInitial } = useContext<any>(PagePathContext)
    const [ref, isIntersecting] = useIntersectionObserver({
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    });
    // const [loading, setLoading] = useState(true);
    // const [hasFetched, setHasFetched] = useState(false);
    const [isClicked, setIsClicked] = useState<{ [key: string]: boolean }>({});
    const [hasInList, setHasInList] = useState<{ [key: string]: boolean }>({});
    const { addItem, deleteItem, logAllItems, itemExists } = useIndexedDB('songDatabase', 'likedSongs');
    const { navigate } = useCustomNavigation();

    useEffect(() => {
        if (data && data.length > 0) {
            // console.log(data);
            setViralsData(data);
        }
        if (data) setFetched(true)
    }, [data])

    useEffect(() => {
        if (isIntersecting) handleIntersection(isIntersecting);
    }, [isIntersecting, handleIntersection]);

    // useEffect(() => {
    //     const fetchViralsData = async () => {
    //         try {
    //             const res = await fetch(`/api/fetchFeatured?location=${fetchLoc}`)
    //             // const data = await res.json()
    //             // console.log(data);
    //             console.log(fetchLoc);
    //             setViralsData(data)
    //             setHasFetched(true);

    //             const songStatusPromises = data.map(async (song: data) => ({
    //                 [song.songId]: await itemExists(song.songId)
    //             }));
    //             const songStatus = await Promise.all(songStatusPromises);
    //             const songStatueMap = Object.assign({}, ...songStatus);
    //             setHasInList(songStatueMap);
    //         } catch (error) {
    //             console.error("Error fetching viral data:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     if (isIntersecting && !hasFetched) {
    //         fetchViralsData();
    //     }
    // }, [isIntersecting, hasFetched, itemExists, fetchLoc]);

    const handleMouseEnter = (index: Key) => {
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(false);
    };

    const playPause = (idx: Key) => {
        playing === idx ? setPlaying(false) : setPlaying(idx);
        setCurrentSongData(viralsData[Number(idx)]);
        console.table("viralsData[Number(idx)]", viralsData[Number(idx)]);
    }

    const handleAddSong = async (d: Data) => {
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
    const handlePagePath = () => {
        navigate("forth", path);
        setPageDataInitial(viralsData)
        setEndPoint(endPoint)
        console.log("setPagePath");
    }

    return (
        <div ref={ref}>
            {viralsData ? <>
                {/* {viralsData && !loading ? <> */}
                <h2 className={style.h}>{h}
                    {path ? <button onClick={handlePagePath}><span>&#10148;</span></button> : null}
                </h2>
                <div className={style.viral_div}>
                    {viralsData?.map((trend: Data, idx: Key) => (
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
            </> : <>
                {!fetched ? <LoadingComponent /> : null}
            </>
            }
        </div>);
}

export default TrendingClient;