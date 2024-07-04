"use client"
import style from "@/app/css/mainBody.module.css"
// import SearchSong from "./SearchSong"
import SongContextProvider from "./context/SongContextProvider"
import Player from "./player/Player"
import { Suspense, useEffect, useState } from "react"
import Trending from "./(collections)/Trending"
import OldIsGold from "./(collections)/OldIsGold"
import Footer from "./Footer"
import LatestBengali from "./(collections)/LatestBengali"
import Bhakti from "./(collections)/Bhakti"
import TopUpdates from "./(collections)/TopUpdates"
import Hero from "./Hero"
import Header from "./Header"
import LoadingComponent from "./LoadingComponent"
import SavedList from "../SavedList/page"

const MainBody: React.FC = () => {
    const [topHeight, setTopHeight] = useState<number>(0);
    const [showList, setShowList] = useState<boolean>(false);

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

    const hendleData = (b: boolean) => {
        setShowList((prev: boolean) => b)
        console.log(showList);
    }
    return (<>
        <Header topHeight={topHeight} />
        <main className={style.main}>
            <SongContextProvider>
                <div className={style.showPice} />
                {showList ? <SavedList /> : <>
                    <Suspense fallback={<LoadingComponent />}>
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
                </>}
                <Player sendToParent={hendleData} />
            </SongContextProvider>
        </main>
    </>
    )
}
export default MainBody