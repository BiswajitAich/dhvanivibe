import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import noImage from '@/public/no-image.webp'
import volMute from '@/public/volume-icon-mute.png'
import vol from '@/public/volume-icon.png'
import style from "@/app/css/player.module.css";

interface PlayerScreenProps {
    data: {
        img: string,
        name: string,
        singer: [string],
        singers: [string],
        size: string,
        songId: string
    };
    volumeProgress: number
    sendDataToParent: (data: any) => void;
}


const PlayerScreen: React.FC<PlayerScreenProps> = ({ data, volumeProgress, sendDataToParent }) => {
    const [progress, setProgress] = useState<number>(volumeProgress);
    const svgRef = useRef<SVGSVGElement>(null);
    // const router = useRouter();

    useEffect(() => {
        sendDataToParent(progress);
    }, [progress])

    const handleMousePosition = (e: MouseEvent | TouchEvent) => {
        let x, y;
        if (!svgRef.current) return;
        const rect = svgRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        if (e.type === "touchmove" || e.type === "touchstart") {
            const touchEvent = e as TouchEvent;
            x = touchEvent.touches[0].clientX - centerX;
            y = touchEvent.touches[0].clientY - centerY;
        } else if (e.type === "mousemove" || e.type === "mousedown") {
            const mouseEvent = e as MouseEvent;
            x = mouseEvent.clientX - centerX;
            y = mouseEvent.clientY - centerY;
        }

        const angleRad = Math.atan2(Number(y), Number(x));
        let angleDeg = angleRad * (180 / Math.PI);
        angleDeg = angleDeg < 0 ? angleDeg + 360 : angleDeg;
        if (angleDeg >= 0 && angleDeg <= 180) {
            const progressPer = (angleDeg / 180);
            setProgress(1 - progressPer);
            // console.log("Progress percentage:", 1 - progressPer);
        }
    };

    const startTracking = (e: React.MouseEvent<SVGCircleElement> | React.TouchEvent<SVGCircleElement> | any) => {
        document.addEventListener("mousemove", handleMousePosition);
        document.addEventListener("touchmove", handleMousePosition);
        document.addEventListener("mouseup", stopTracking);
        document.addEventListener("touchend", stopTracking);
        handleMousePosition(e);
    };

    const stopTracking = () => {
        document.removeEventListener("mousemove", handleMousePosition);
        document.removeEventListener("touchmove", handleMousePosition);
        document.removeEventListener("mouseup", stopTracking);
        document.removeEventListener("touchend", stopTracking);
    };

    return (
        <>
            <div className={style.songImage}>
                <Image src={volMute} height={30} width={30} alt="mute" className={style.volMute} />
                <div>
                    <Image
                        height={200}
                        width={200}
                        sizes="{max-width: 320px} 100"
                        src={data?.img.replace(/(\d+)\.jpg$/, "4.jpg") || noImage}
                        alt={data?.name || "no image"}
                        placeholder="blur"
                        blurDataURL={noImage.toString()}
                    />
                </div>
                <svg ref={svgRef}>
                    <circle className={style.circle1} />
                    <circle
                        className={style.circle2}
                        style={{
                            strokeDashoffset: `calc(880 - (880 * (${progress}/2)) )`
                        }}
                    />
                    <circle
                        className={style.circle3}
                        onMouseDown={startTracking}
                        onTouchStart={startTracking}
                        onMouseLeave={stopTracking}
                        onTouchEnd={startTracking}
                    />
                </svg>

                <Image src={vol} height={30} width={30} alt="high volume" className={style.vol} />
            </div>
            <div className={style.titles}>
                <p>{data?.name}</p>
                <p>{data?.singer || data?.singers}</p>
            </div>
        </>
    );
};

export default PlayerScreen