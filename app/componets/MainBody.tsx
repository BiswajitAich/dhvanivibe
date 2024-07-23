"use client"
import style from "@/app/css/mainBody.module.css"
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
import useCustomNavigation from "../js/useCustomNavigation"
import { CustomNavigationContext } from "./context/CustomNavigationContextProvider"

const MainBody: React.FC = () => {
    const [view, setView] = useState<string>("home");
    const { navigate, lastComponent } = useCustomNavigation();
    const { navStack } = useContext(CustomNavigationContext);

    useEffect(() => {
        const handlePopState = () => {
            navigate("");
            setView(lastComponent)
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    useEffect(() => {
        setView(lastComponent)
    }, [navStack]);

    return (<>
        {view === "home" ?
            <main className={style.main}>
                <div className={style.showPice} />
                <Suspense fallback={<LoadingComponent />}>
                    <Hero />
                    <Trending />
                    <TopUpdates />
                    <LatestBengali />
                    <OldIsGold />
                    <Bhakti />
                    <Footer />
                </Suspense>
            </main>
            : null
        }
        {view == "saved-songs" ? <SavedList /> : null}
        {view === "TrendingSongs" ? <TrendingSongs /> : null}
        {view === "TopSongs" ? <TopSongs /> : null}
        {view === "LatestBengaliSongs" ? <LatestBengaliSongs /> : null}
        {view === "OldIsGoldSongs" ? <OldIsGoldSongs /> : null}
        {view === "BhaktiSongs" ? <BhaktiSongs /> : null}

    </>
    )
}
export default MainBody