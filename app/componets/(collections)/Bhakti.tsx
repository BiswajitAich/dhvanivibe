import useFetch from "@/app/js/useFetch";
import TrendingClient from "@/app/uiComponents/TrendingClient";
import { useEffect, useState } from "react";

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
            endPoint={"bhakti-latest-updates"}
        />
    );
}

export default Bhakti;
