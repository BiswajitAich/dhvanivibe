import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const songId = searchParams.get("songId")

    const fetchData = async (songId: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API1}/download-urls?id=${songId}`,{
                next:{
                    revalidate: 3600
                }
            });
            const data = await res.json()
            console.log("server data fetched:", data)

            console.log(" fetched url:", `${process.env.NEXT_PUBLIC_API1}/download-urls?id=${songId}`)
            return data;
        } catch (error) {
            console.log("EEEEEEEEEEEEEEEEEEEEEEEEE", error)
            // console.log(" fetched url:", `${process.env.NEXT_PUBLIC_API1}/download-urls?id=${songId}`)
            return null
        }
    }

    try {
        const data = await fetchData(String(songId))
        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("500 error", { status: 500 })
    }
}