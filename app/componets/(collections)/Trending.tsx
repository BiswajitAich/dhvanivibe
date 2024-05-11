import TrendingClient from "../client/TrendingClient";

const Trending = () => {   
    return <TrendingClient fetchLoc={"featured"} h={"Trending Songs"}/>
}

export default Trending;