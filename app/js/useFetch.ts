const useFetch = async (endPoint: string, page: number = 1) => {
    try {
        const res = await fetch(`/api/fetchFeatured?location=${endPoint}&page=${page}`,
            {
                next: { revalidate: 3600 }
            }
        )
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching viral data:", error);
        return null
    }
}

export default useFetch;
