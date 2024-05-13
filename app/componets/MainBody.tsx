import style from "@/app/css/mainBody.module.css"
// import SearchSong from "./SearchSong"
import SongContextProvider from "./context/SongContextProvider"
import Player from "./Player"
import { Suspense } from "react"
import Trending from "./(collections)/Trending"
import OldIsGold from "./(collections)/OldIsGold"
import Footer from "./Footer"
import LatestBengali from "./(collections)/LatestBengali"
import Bhakti from "./(collections)/Bhakti"
import TopUpdates from "./(collections)/TopUpdates"
import Hero from "./Hero"

const MainBody: React.FC = () => {
    return (
        <main className={style.main}>
            <SongContextProvider>
                <div className={style.showPice} />
                <Suspense fallback={<p>Loading...</p>}>
                    <Hero />
                    <Trending />
                    <TopUpdates />
                    <LatestBengali />
                    <OldIsGold />
                    <Bhakti />
                    <Footer />
                </Suspense>
                {/* <div className={style.contain}>
                </div> */}
                {/* <SearchSong /> */}
                <Player />
            </SongContextProvider>
        </main>
    )
}
export default MainBody