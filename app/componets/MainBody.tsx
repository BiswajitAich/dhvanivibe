"use client"
import style from "@/app/css/mainBody.module.css"
// import SearchSong from "./SearchSong"
// import Player from "./player/Player"
import { Suspense, useContext, useEffect, useState } from "react"
import Trending from "./(collections)/Trending"
import OldIsGold from "./(collections)/OldIsGold"
import Footer from "./Footer"
import LatestBengali from "./(collections)/LatestBengali"
import Bhakti from "./(collections)/Bhakti"
import TopUpdates from "./(collections)/TopUpdates"
import Hero from "./Hero"
import LoadingComponent from "./LoadingComponent"
import SavedList from "../SavedList/page"
import { PagePathContext } from "./context/PathContextProvider"
import TopSongs from "../(pages)/Topsongs/page"
import TrendingSongs from "../(pages)/TrendingSongs/page"
import BhaktiSongs from "../(pages)/BhaktiSongs/page"
import LatestBengaliSongs from "../(pages)/LatestBengaliSongs/page"
import OldIsGoldSongs from "../(pages)/OldIsGoldSongs/page"
interface Props {
    currentView: string
}
const MainBody: React.FC<Props> = ({ currentView }) => {
    // const [showList, setShowList] = useState<boolean>(false);
    const [view, setView] = useState<string>(currentView);
    const { pagePath } = useContext(PagePathContext);
    const [page, setPage] = useState<string>("");

    useEffect(() => {
        setView(currentView)
        console.log(currentView);

    }, [currentView])
    // const hendleData = (b: boolean) => {
    //     setShowList((prev: boolean) => b)
    //     console.log(showList);
    // }

    useEffect(() => {
        if (pagePath) {
            if (pagePath !== page) {
                // Push new state to history
                window.history.pushState({ pagePath }, "", `/${pagePath}`);
                setPage(pagePath);
            }
        } else {
            if (page) {
                // Go back to the previous state
                window.history.back();
                setPage("");
            }
        }
        console.log(pagePath);
    }, [pagePath]);

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            const newPagePath = event.state?.pagePath || "";
            setPage(newPagePath);
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (<>
        {page === "" ?
            <main className={style.main}>
                <div className={style.showPice} />
                {view == "saved-songs" ? <SavedList /> : null}
                {view == "home" ? <>
                    <Suspense fallback={<LoadingComponent />}>
                        <Hero />
                        <Trending />
                        <TopUpdates />
                        <LatestBengali />
                        <OldIsGold />
                        <Bhakti />
                        <Footer />
                    </Suspense>
                </> : null}
                {/* <Player sendToParent={hendleData} /> */}
            </main>
            : null
        }
        {page === "TrendingSongs" ? <TrendingSongs /> : null}
        {page === "TopSongs" ? <TopSongs /> : null}
        {page === "LatestBengaliSongs" ? <LatestBengaliSongs /> : null}
        {page === "OldIsGoldSongs" ? <OldIsGoldSongs /> : null}
        {page === "BhaktiSongs" ? <BhaktiSongs /> : null}

    </>
    )
}
export default MainBody