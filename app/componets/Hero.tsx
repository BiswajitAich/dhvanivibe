"use client"
import style from "@/app/css/mainBody.module.css"
import Image from "next/image"
import music_girl from "@/public/music-girl.webp"
import { useEffect, useRef, useState } from "react"
import Header from "./Header"

const Hero = () => {
    const [message, setMessage] = useState<string>("");
    const [offsetX, setOffsetX] = useState<number>();
    const [offsetY, setOffsetY] = useState<number>();
    const [topHeight, setTopHeight] = useState<number>(0);
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
        const interval = setInterval(() => {
            if (isElementInViewport()) {
                typeWriter();
            }
        }, 1000);

        return () => clearInterval(interval);

    }, []);
    const isElementInViewport = () => {
        const rect = elementRef.current?.getBoundingClientRect();
        if (rect) return rect.top < window.innerHeight && rect.bottom >= 0;
        else return false;
    };

    const rotateElement = (e: any) => {
        if (window?.innerWidth <= 410) return;
        const x = e.clientX;
        const y = e.clientY;

        const elementRect = elementRef.current?.getBoundingClientRect();
        if (!elementRect || elementRect.top <= 5) return;

        const midX = elementRect.left + elementRect.width / 2;
        const midY = elementRect.top + elementRect.height / 2;

        const offsetXValue = ((x - midX) / midX) * 35;
        const offsetYValue = ((y - midY) / midY) * 35;

        setOffsetX(offsetXValue);
        setOffsetY(-offsetYValue);
    }
    const hendleMouseLeave = () => {
        if (window?.innerWidth <= 410) return;
        setOffsetX(0)
        setOffsetY(0)
    }
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

        </>
    );
}

export default Hero;