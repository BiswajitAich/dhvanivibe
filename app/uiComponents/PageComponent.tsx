import React, { useContext, useEffect, useState } from "react";
import styles from "@/app/css/pageComponent.module.css";
import Image from "next/image";
import downloading from "@/public/downloading.png";
import dynamic from "next/dynamic";
import { SongContext } from "../componets/context/SongContextProvider";
import useCustomNavigation from "../js/useCustomNavigation";
import useFetch from "../js/useFetch";
import { PagePathContext } from "../componets/context/PathContextProvider";

const DownloadOptionsPopup = dynamic(() => import("./downloadPopup/DownloadOptionsPopup"));
const Header = dynamic(() => import("../componets/Header"));

interface Song {
    img: string;
    name: string;
    singers: string[];
    size: string;
    songId: string;
}

interface Props {
    initialData: Song[],
    title: string
}

interface DownloadOption {
    link: string,
    kbps: string,
    size: string
}

const PageComponent: React.FC<Props> = ({ initialData, title }) => {
    const { currentSongData, setCurrentSongData } = useContext<any>(SongContext);
    const [topHeight, setTopHeight] = useState<number>(0);
    const [pageDataToDisplay, setPageDataToDisplay] = useState<Song[]>(initialData);
    const [downloadOptions, setDownloadOptions] = useState<DownloadOption[] | null>(null);
    const [downloadTitle, setDownloadTitle] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(2);
    const { navigate } = useCustomNavigation();
    const { endPoint } = useContext<any>(PagePathContext)

    useEffect(() => {
        // Only update if initialData is not empty and is different from current state
        if (initialData.length > 0 && initialData !== pageDataToDisplay) {
            setPageDataToDisplay(initialData);
        }
    }, [initialData]);

    const handleDownload = async (songId: string, fileName: string) => {
        if (!songId || !fileName) return;
        try {
            const res = await fetch(`/api/fetchDownloadUrls?songId=${songId}`);
            const data = await res.json();
            console.log("song download data", data);
            console.log("id", songId);
            if (!data[0]) return;
            setDownloadOptions(data);
            setDownloadTitle(fileName);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSongClick = (song: Song) => {
        setCurrentSongData(song);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY <= 85) {
                setTopHeight(window.scrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const closePopup = () => {
        setDownloadOptions(null);
    };

    const handleMoreLoad = async () => {
        try {
            const data = await useFetch(endPoint, pageNumber);
            if (data.length > 0) {
                setPageDataToDisplay((prevData) => [...prevData, ...data]);
                setPageNumber(prev=>prev+1)
                console.log(pageNumber);
                
            }
            console.log(data);
            
        } catch (error) {
            console.log("Error fetching more data:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Header topHeight={topHeight} />
            <section>
                <div className={styles.hero}>
                    <button className={styles.loadMore} onClick={() => navigate("back")}>Back</button>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.heroImg}>
                        <Image src={pageDataToDisplay[0]?.img || ""} alt="" fill loading="lazy" />
                    </div>
                </div>
                <ul className={styles.songList}>
                    {pageDataToDisplay.map((song, key) => (
                        <li
                            key={`${song.songId}-${key}`}
                            className={`${styles.songItem} ${currentSongData?.songId === song.songId ? styles.currentSongData : ""}`}
                            onClick={() => handleSongClick(song)}
                        >
                            <Image src={song.img} height={300} width={250} alt={song.name} className={styles.songImage} />
                            <div className={styles.songInfo}>
                                <section>
                                    <p className={styles.songTitle}>{song.name}</p>
                                    <p className={styles.songSingers}>{song.singers?.length > 0 ? song.singers.join(", ") : "Unknown Singer"}</p>
                                    <p className={styles.songSize}>{song.size}</p>
                                </section>
                                <section>
                                    <button className={styles.download} onClick={() => handleDownload(song.songId, song.name)}>
                                        <Image src={downloading} alt="download" height={25} width={25} />
                                    </button>
                                </section>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className={styles.loadMore} onClick={handleMoreLoad}>Load More</button>
            </section>
            {downloadOptions && <DownloadOptionsPopup options={downloadOptions} onClose={closePopup} name={downloadTitle} />}
        </div>
    );
}

export default PageComponent;
