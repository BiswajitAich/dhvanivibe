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

const OldIsGold = () => {
    const [call, setCall] = useState(false);
    const [intersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!displayData) {
                displayData = await useFetch("old-is-gold-hindi");
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
            h={"Golden Times Hindi"}
            path={"OldIsGoldSongs"}
            handleIntersection={handleIntersection}
            endPoint={"old-is-gold-hindi"}
        />
    );
}

export default OldIsGold;
