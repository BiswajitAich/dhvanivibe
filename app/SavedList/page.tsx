"use client"
import Image from 'next/image';
import style from './css/savedList.module.css';
import i from '@/public/music-girl.webp';
import Card from './Card';
// import Player from '../componets/player/Player';
import { useEffect, useState } from "react";
import useIndexedDB from '../componets/js/useIndexedDB';
import Header from '../componets/Header';
interface data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
const SavedList = () => {
    const { getAllItems } = useIndexedDB('songDatabase', 'likedSongs');
    const [list, setList] = useState<[data] | []>([]);
    const [topHeight, setTopHeight] = useState<number>(0);

    useEffect(() => {
        const getData = async () => {
            const data = await getAllItems();
            // console.log(data);
            setList(data);
        };
        getData();
    }, [getAllItems]);


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
    return (
        <>
            <Header topHeight={topHeight} />
            <main className={style.main}>
                <div className={`${style.div1} ${style.div1x}`}>
                    <Image src={list[0]?.img.replace("_1.jpg", "_3.jpg") || i} alt={'image'} loading='lazy' width={500} height={500} />
                    <p>SAVED AUDIO</p>
                </div>
                <div className={style.list}>
                    <div className={`${style.heartContainer} ${style.div1}`}>
                        <div className={`${style.heart} ${style.div1}`} />
                    </div>
                    <p>!!! THE SONG YOU LOVE !!!</p>
                    {list?.map((e, idx) => (
                        <Card
                            key={idx}
                            e={e}
                        />
                    ))}
                </div>
            </main>
            {/* <div className={style.player}>
                <Player />
            </div> */}
        </>
    );
}

export default SavedList;
