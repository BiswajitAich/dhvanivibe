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

const LatestUpdates = () => {
    const [called, setCalled] = useState(false);
    const [intersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!displayData) {
                displayData = await useFetch("updates");
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
            h={"Latest Updates"}
            path={"LatestUpdatesSongs"}
            handleIntersection={handleIntersection}
            endPoint={"updates"}
        />
    );
}

export default LatestUpdates;
