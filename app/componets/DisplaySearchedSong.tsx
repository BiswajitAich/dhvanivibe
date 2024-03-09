import Image from "next/image"
import React, { useContext } from "react"
import style from "@/app/css/search.module.css"
import { SongContext } from "./context/SongContextProvider"

const DisplaySearchedSong: React.FC<any> = ({ clearSongData }) => {
    const [fetching, setFetching] = React.useState<boolean>(false)
    const { songData, setCurrentSongData } = useContext<any>(SongContext)

    const handleSongId = (songId: string, title: string, img: string) => {
        console.log("songId", songId)
        setFetching(prev => prev = true)
        setCurrentSongData(
            {
                id: songId,
                title: title,
                img: img
            }
        )
        setTimeout(() => {
            setFetching(false);
        }, 500);
    }

    const handleBack = () => {
        clearSongData()
    }
    return (
        <div>
            <button className={style.back} onClick={handleBack}>back</button>
            <p style={{ marginTop: '10px' }}>Songs Found !</p>
            <div className={style.songCards}>
                {songData?.map((song: any, idx: number) => (
                    <button key={idx}
                        onClick={() => handleSongId(song.id, song.title, song.img)}
                        disabled={fetching}
                        className={style.songs}
                    >
                        <div className={style.songDivs}>
                            <Image
                                src={song.img}
                                height={180}
                                width={150}
                                alt={`image ${idx}`} />
                        </div>
                        <p>{song.title}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}
export default DisplaySearchedSong