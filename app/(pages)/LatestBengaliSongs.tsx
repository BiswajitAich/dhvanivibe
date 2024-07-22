import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import dynamic from "next/dynamic";
import { useContext } from "react";
const PageComponent = dynamic(() => import("../componets/client/PageComponent"));
const LatestBengaliSongs = () => {
    const { pageDataInitial } = useContext(PagePathContext);
    return (
        <PageComponent initialData={pageDataInitial} title={"Latest Bengali Songs"}/>
    );
}

export default LatestBengaliSongs;