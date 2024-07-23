const useFetch = async (endPoint: string, page?:number) => {
        try {
            const res = await fetch(`/api/fetchFeatured?location=${endPoint}&page=${page}`)
            const data = await res.json()
            // console.log(data);
            return data
        } catch (error) {
            console.error("Error fetching viral data:", error);
            return null
        }
}

export default useFetch;