"use client"
import style from "@/app/css/mainBody.module.css"
// import SearchSong from "./SearchSong"
import SongContextProvider from "./context/SongContextProvider"
import Player from "./Player"
import Image from "next/image"
import music_girl from "@/public/music-girl.webp"
import { useEffect, useRef, useState } from "react"
import Trending from "./(collections)/Trending"
import OldIsGold from "./(collections)/OldIsGold"
import Footer from "./Footer"

const MainBody: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [offsetX, setOffsetX] = useState<number>();
    const [offsetY, setOffsetY] = useState<number>();
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const str1 = "MUSIC";
        const str2 = "LIFE";
        let i = 0;
        let o = 1;

        const typeWriter = () => {
            if (i < str1.length && o == 1) {
                setMessage((prevMessage: string) => (prevMessage = str1.slice(0, i)));
                i++;
                i == str1.length ? o = 2 : o = 1;
            } else if (i >= 0 && o == 2) {
                setMessage((prevMessage: string) => (prevMessage = str1.slice(0, i)));
                i--;
                i == 0 ? o = 3 : o = 2;
            } else if (i < str2.length && o == 3) {
                setMessage((prevMessage: string) => (prevMessage = str2.slice(0, i)));
                i++;
                i == str1.length - 1 ? o = 4 : o = 3;
            } else if (i >= 0 && o == 4) {
                setMessage((prevMessage: string) => (prevMessage = str2.slice(0, i)));
                i--;
                i == 0 ? o = 1 : o = 4;
            }
        };
        const interval = setInterval(() => typeWriter(), 500);

        return () => clearInterval(interval);

    }, []);

    const rotateElement = (e: any) => {
        const x = e.clientX;
        const y = e.clientY;

        const elementRect = elementRef.current?.getBoundingClientRect();
        if (!elementRect) return;

        const midX = elementRect.left + elementRect.width / 2;
        const midY = elementRect.top + elementRect.height / 2;

        const offsetXValue = ((x - midX) / midX) * 35;
        const offsetYValue = ((y - midY) / midY) * 35;

        setOffsetX(offsetXValue);
        setOffsetY(-offsetYValue);
    }
    const hendleMouseLeave = () => {
        setOffsetX(0)
        setOffsetY(0)
    }
    return (
        <main className={style.main}>
                <SongContextProvider>
                    <div className={style.showPice} />
                    <div className={style.m_b1}>
                        <div className={style.m_b2}
                            ref={elementRef}
                            onMouseMove={(e) => rotateElement(e)}
                            onMouseLeave={hendleMouseLeave}
                        >
                            <div className={style.m_b2_1}>
                                <Image src={music_girl} height={600} alt="music" />
                            </div>
                            <div className={style.m_b2_2}

                            >
                                <div className={style.m_b2_2_1}

                                    style={{
                                        transform: `perspective(1000px) rotateX(${offsetY}deg) rotateY(${offsetX}deg)`
                                    }}
                                >
                                    <p>Free Music Streaming App</p>
                                    <span>no {message}|</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Trending />
                    <OldIsGold />
                    <Footer />
                    {/* <div className={style.contain}>
                </div> */}
                    {/* <SearchSong /> */}
                    <Player />
                </SongContextProvider>
        </main>
    )
}
export default MainBody