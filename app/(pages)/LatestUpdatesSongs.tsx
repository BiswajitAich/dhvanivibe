import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import dynamic from "next/dynamic";
import { useContext } from "react";
const PageComponent = dynamic(() => import("../uiComponents/PageComponent"));

const LatestUpdatesSongs = () => {
    const { pageDataInitial } = useContext(PagePathContext);

    return (
        <PageComponent initialData={pageDataInitial} title={"Trending Songs"} />
    );
}

export default LatestUpdatesSongs;
