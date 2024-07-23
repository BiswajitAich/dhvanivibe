import useFetch from "@/app/js/useFetch";
import TrendingClient from "@/app/uiComponents/TrendingClient";
import { useState, useEffect } from "react";

interface data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
let displayData: data | null = null

const TopUpdates = () => {
    const [called, setCalled] = useState(false);
    const [intersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!displayData) {
                displayData = await useFetch("top-updates");
                setCalled(true);
            }
        };

        if (intersecting && !called) {
            fetchData();
        }
    }, [intersecting, called]);

    const handleIntersection = (isIntersecting: boolean) => {
        setIntersecting(isIntersecting);
    };

    return (
        <TrendingClient
            data={displayData}
            h={"Top Songs"}
            path={"TopSongs"}
            handleIntersection={handleIntersection}
            endPoint={"top-updates"}
        />
    );
}

export default TopUpdates;
