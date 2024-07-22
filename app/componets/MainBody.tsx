"use client"
import style from "@/app/css/mainBody.module.css"
// import SearchSong from "./SearchSong"
// import Player from "./player/Player"
import dynamic from "next/dynamic"
import { Suspense, useContext, useEffect, useState } from "react"
const Trending = dynamic(() => import("./(collections)/Trending"))
const OldIsGold = dynamic(() => import("./(collections)/OldIsGold"));
const Footer = dynamic(() => import("./Footer"));
const LatestBengali = dynamic(() => import("./(collections)/LatestBengali"));
const Bhakti = dynamic(() => import("./(collections)/Bhakti"));
const TopUpdates = dynamic(() => import("./(collections)/TopUpdates"));
const Hero = dynamic(() => import("./Hero"));
const LoadingComponent = dynamic(() => import("./LoadingComponent"));
const SavedList = dynamic(() => import("../SavedList/page"));
const TopSongs = dynamic(() => import("../(pages)/TopSongs"));
const TrendingSongs = dynamic(() => import("../(pages)/TrendingSongs"));
const BhaktiSongs = dynamic(() => import("../(pages)/BhaktiSongs"));
const LatestBengaliSongs = dynamic(() => import("../(pages)/LatestBengaliSongs"));
const OldIsGoldSongs = dynamic(() => import("../(pages)/OldIsGoldSongs"));
import { PagePathContext } from "./context/PathContextProvider"

// interface Props {
//     currentView: string
// }
const MainBody: React.FC = () => {
    // const [showList, setShowList] = useState<boolean>(false);
    // const [view, setView] = useState<string>(currentView);
    const { pagePath, setPagePath } = useContext(PagePathContext);
    // const [page, setPage] = useState<string>("home");

    // useEffect(() => {
    //     setView(currentView)
    //     console.log(currentView);

    // }, [currentView])
    // const hendleData = (b: boolean) => {
    //     setShowList((prev: boolean) => b)
    //     console.log(showList);
    // }

    useEffect(() => {
            if (pagePath === "home") {
                // window.history.back();
                setPagePath("home");
            } else {
                window.history.pushState({}, "");
                setPagePath(pagePath);
            }
        console.log();
    }, [pagePath]);

    useEffect(() => {
        const handlePopState = () => {
            // pagePath === "home" ? setPagePath("home") : setPagePath(null)
            setPagePath("home")
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (<>
        {pagePath === "home" ?
            <main className={style.main}>
                <div className={style.showPice} />
                {/* {view == "home" ? <> */}
                    <Suspense fallback={<LoadingComponent />}>
                        <Hero />
                        <Trending />
                        <TopUpdates />
                        <LatestBengali />
                        <OldIsGold />
                        <Bhakti />
                        <Footer />
                    </Suspense>
                {/* </> : null} */}
                {/* <Player sendToParent={hendleData} /> */}
            </main>
            : null
        }
        {pagePath == "saved-songs" ? <SavedList /> : null}
        {pagePath === "TrendingSongs" ? <TrendingSongs /> : null}
        {pagePath === "TopSongs" ? <TopSongs /> : null}
        {pagePath === "LatestBengaliSongs" ? <LatestBengaliSongs /> : null}
        {pagePath === "OldIsGoldSongs" ? <OldIsGoldSongs /> : null}
        {pagePath === "BhaktiSongs" ? <BhaktiSongs /> : null}

    </>
    )
}
export default MainBody