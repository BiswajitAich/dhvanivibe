import useFetch from "@/app/js/useFetch";
import TrendingClient from "@/app/uiComponents/TrendingClient";
import { useState, useEffect } from "react";

interface data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
let displayData: data | null = null;

const LatestBengali = () => {
    const [call, setCall] = useState(false);
    const [intersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!displayData) {
                displayData = await useFetch("bengali-latest-updates");
                setCall(true);
            }
        };

        if (intersecting && !call) {
            fetchData();
        }
    }, [intersecting, call]);

    const handleIntersection = (isIntersecting: boolean) => {
        setIntersecting(isIntersecting);
    };

    return (
        <TrendingClient
            data={displayData}
            h={"Bengali Latest Songs"}
            path={"LatestBengaliSongs"}
            handleIntersection={handleIntersection}
            endPoint={"bengali-latest-updates"}
        />
    );
}

export default LatestBengali;
