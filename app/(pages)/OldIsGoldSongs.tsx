import { PagePathContext } from "@/app/componets/context/PathContextProvider";
import { useContext } from "react";
const OldIsGoldSongs = () => {
    const { setPagePath } = useContext(PagePathContext);
    return (
        <div>
            <button onClick={() => setPagePath("")}>back</button>
            Enter
        </div>
    );
}

export default OldIsGoldSongs;