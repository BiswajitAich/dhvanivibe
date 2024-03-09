import style from "@/app/css/mainBody.module.css"
import SearchSong from "./SearchSong"
import SongContextProvider from "./context/SongContextProvider"
import Player from "./Player"
const MainBody: React.FC = () => {
    return (
        <main className={style.main}>
            <SongContextProvider>
                <div className={style.showPice} />
                <SearchSong />
                <Player />
            </SongContextProvider>
        </main>
    )
}
export default MainBody