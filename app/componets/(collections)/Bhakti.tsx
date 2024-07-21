import { useEffect, useState } from "react";
import TrendingClient from "../client/TrendingClient";
import useFetch from "../js/useFetch";

interface data {
    img: string,
    name: string,
    singer: string,
    songId: string
}
let displayData: data | null = null;

const Bhakti = () => {
    const [call, setCall] = useState(false);
    const [intersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!displayData) {
                displayData = await useFetch("bhakti-latest-updates");
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
            h={"Bhakti Songs"}
            path={"BhaktiSongs"}
            handleIntersection={handleIntersection}
        />
    );
}

export default Bhakti;
