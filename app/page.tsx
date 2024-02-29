import { Suspense } from "react";
import Header from "./componets/Header";
import MainBody from "./componets/MainBody";
// import Player from "./componets/Player";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Suspense fallback={"loading..."}>
      <Header />
      <MainBody />
      {/* <Player /> */}
      </Suspense>
    </>
  );
}
