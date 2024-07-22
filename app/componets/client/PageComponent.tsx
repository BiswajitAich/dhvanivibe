import React, { useContext, useEffect, useState } from "react";
import { PagePathContext } from "../context/PathContextProvider";
import styles from "@/app/css/pageComponent.module.css"
import Header from "../Header";
import Image from "next/image";
import downloading from "@/public/downloading.png"
import { SongContext } from "../context/SongContextProvider";
import DownloadOptionsPopup from "./downloadPopup/DownloadOptionsPopup";

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
    const [data, setData] = useState<Song[]>(initialData);
    const { setPagePath } = useContext(PagePathContext);
    const { currentSongData, setCurrentSongData } = useContext<any>(SongContext);
    const [topHeight, setTopHeight] = useState<number>(0);
    const [downloadOptions, setDownloadOptions] = useState<DownloadOption[] | null>(null);
    const [downloadTitle, setDownloadTitle] = useState<string>("null");

    useEffect(() => {
        console.log(data);
    }, [setPagePath])

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
        if (bottom) {
            // fetchMoreSongs();
            console.log("fetch again");
        }
    };
    const handleDownload = async (songId: string, fileName: string) => {
        if (!songId || !fileName) return
        try {
            const res = await fetch(`/api/fetchSong?songId=${songId}`)
            const data = await res.json()
            console.log("song download data", data);
            console.log("id", songId);
            if (!data[0]) return
            setDownloadOptions(data);
            setDownloadTitle(fileName)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSongClick = (song: Song) => {
        setCurrentSongData(song);
        // console.log(song);
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

    return (
        <div className={styles.container} onScroll={handleScroll}>
            <Header topHeight={topHeight} />
            <section>
                <div className={styles.hero}>
                    <button className={styles.loadMore} onClick={() => setPagePath("home")}>Back</button>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.heroImg} >
                        <Image src={data[0]?.img} alt="" fill loading="lazy" />
                    </div>
                </div>
                <ul className={styles.songList}>
                    {data.map((song) => (
                        <li
                            key={song.songId}
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
                                    <button className={styles.download} onClick={() => handleDownload(song?.songId, song?.name)}>
                                        <Image src={downloading} alt="download" height={25} width={25} />
                                    </button>
                                    {/* <button className={styles.heart} /> */}
                                </section>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className={styles.loadMore} onClick={() => console.log("Load more songs")}>Load More</button>
            </section>
            {downloadOptions && <DownloadOptionsPopup options={downloadOptions} onClose={closePopup} name={downloadTitle} />}
        </div>
    );
}

export default PageComponent;