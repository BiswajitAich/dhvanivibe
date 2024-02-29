import Image from "next/image"
import React from "react"
import style from "@/app/css/search.module.css"

interface props {
    id: string,
    img: string,
    title: string
}
const DisplaySearchedSong: React.FC<any> = ({ songData, sendSource, sendTitle, clearSongData }) => {
    const [fetching, setFetching] = React.useState<boolean>(false)

    const handleSongId = (songId: string, title: string) => {
        console.log("songId",songId)
        sendTitle(title)
        sendSource(songId)
    }

    const handleBack = () => {
        clearSongData()
    }
    return (
        <div>
            <button className={style.back} onClick={handleBack}>back</button>
            <p>Songs Found !</p>
            {songData?.response?.map((song: props, idx: number) => (
                <button key={idx} onClick={() => handleSongId(song.id, song.title)} disabled={fetching}>
                    <div>
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
    )
}
export default DisplaySearchedSong