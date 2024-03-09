import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams  = request.nextUrl.searchParams
    const searchSong = searchParams.get("searchSong")

    const fetchData = async (searchName: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}search?q=${searchName}&searchEngine=wunk`);
            const data = await res.json()
            console.log("server data fetched:",data)
            return data;
            
        } catch (error) {
            console.log("EEEEEEEEEEEEEEEEEEEEEEEEE",error)
            return null
        }
    }

    try {
        const data = await fetchData(String(searchSong))
        return new NextResponse(JSON.stringify(data),{status: 200})
    } catch (error) {
        console.log(error)
        return new NextResponse("500 error",{status: 500})
    }
}
