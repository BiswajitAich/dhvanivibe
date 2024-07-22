import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import { useContext } from "react";
import dynamic from "next/dynamic";
const PageComponent = dynamic(()=>import("../componets/client/PageComponent"));
const TopSongs = () => {
    const { pageDataInitial } = useContext(PagePathContext);
    return (
        <PageComponent initialData={pageDataInitial} title={"Top Songs"}/>
    );
}

export default TopSongs;