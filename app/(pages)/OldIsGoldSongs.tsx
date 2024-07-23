import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import { useContext } from "react";
import dynamic from "next/dynamic";
const PageComponent = dynamic(() => import("../uiComponents/PageComponent"));

const OldIsGoldSongs = () => {
    const { pageDataInitial } = useContext(PagePathContext);
    return (
        <PageComponent initialData={pageDataInitial} title={"Old Is Gold Songs"}/>

    );
}

export default OldIsGoldSongs;