"use client"
import style from "./page.module.css"
import { Suspense, useState } from "react";
import MainBody from "./componets/MainBody";
import SideBar from "./componets/sidebar/SideBar";
import Player from "./componets/player/Player";
import SongContextProvider from "./componets/context/SongContextProvider";
import PagePathContextProvider from "./componets/context/PathContextProvider";
import CustomNavigationContextProvider from "./componets/context/CustomNavigationContextProvider";
// import Header from "./componets/Header";
// import styles from "./page.module.css";

export default function Home() {
  // const [topHeight, setTopHeight] = useState<number>(0);
  // const [currentView, setCurrentView] = useState<string>("home");
  const [show, setShow] = useState<boolean>();
  // const handleViewChange = (view: string) => {
  //   if (view === "home")
  //     window.history.back()
  //   else
  //     window.history.pushState(null, "")
  //   setCurrentView(view);
  // }
  const handleSetShow = (e: boolean) => {
    if (e) {
      setShow(e);
    }
    else {
      setTimeout(() => {
        setShow(e);
      }, 300)
    }
  }
  // useEffect(() => {
  //   const handlePopState = () => {
  //     setCurrentView("home");
  //   };

  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);
  //   useEffect(() => {
  //     const handleScroll = () => {

  //         if (window.scrollY <= 85) {
  //             setTopHeight(window.scrollY);
  //         }
  //     };

  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //     };
  // }, []);



  return (
    <div className={style.home}
      style={{
        display: show ? "grid" : ""
      }}
    >
      <Suspense fallback={"loading..."}>
        {/* <Header topHeight={topHeight} /> */}
        <SongContextProvider>
          <CustomNavigationContextProvider >
            <PagePathContextProvider>
              {/* <SideBar view={handleViewChange} handleGrid={handleSetShow} /> */}
              <SideBar handleGrid={handleSetShow} />
              {/* <MainBody currentView={currentView} /> */}
              <MainBody />
              <Player />
            </PagePathContextProvider>
          </CustomNavigationContextProvider>
        </SongContextProvider>
      </Suspense>
    </div>
  );
}
