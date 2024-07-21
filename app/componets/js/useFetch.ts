const useFetch = async (endPoint: string) => {
        try {
            const res = await fetch(`/api/fetchFeatured?location=${endPoint}`)
            const data = await res.json()
            // console.log(data);
            return data
        } catch (error) {
            console.error("Error fetching viral data:", error);
            return null
        }
}

export default useFetch;