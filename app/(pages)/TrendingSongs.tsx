import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import dynamic from "next/dynamic";
import { useContext } from "react";
const PageComponent = dynamic(() => import("../uiComponents/PageComponent"));

const TrendingSongs = () => {
    const { pageDataInitial } = useContext(PagePathContext);

    return (
        <PageComponent initialData={pageDataInitial} title={"Trending Songs"}/>
    );
}

export default TrendingSongs;
