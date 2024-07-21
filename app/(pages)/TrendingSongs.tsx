import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import { useContext } from "react";

const TrendingSongs = () => {
    const { setPagePath } = useContext(PagePathContext);

    return (
        <div>
            <button onClick={()=>setPagePath("")}>back</button>
            Enter
            tttttttt
        </div>
    );
}

export default TrendingSongs;