import { Suspense } from "react";
import MainBody from "./componets/MainBody";
// import Player from "./componets/Player";
// import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Suspense fallback={"loading..."}>
      <MainBody />
      {/* <Player /> */}
      </Suspense>
    </>
  );
}
