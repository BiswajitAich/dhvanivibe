import TrendingClient from "../client/TrendingClient";

const TopUpdates = () => {   
    return <TrendingClient fetchLoc={"top-updates"} h={"Top Songs"}/>
}

export default TopUpdates;