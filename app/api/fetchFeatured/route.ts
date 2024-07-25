import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || 1;
    const location = searchParams.get('location');

    try {
        const res = await fetch(`https://pagal-music-api.vercel.app/${location}?page=${page}`, {
            next: {
                revalidate: 3600
            }
            // cache: "no-cache"
        })
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }
        const data = await res.json()
        console.log(`https://pagal-music-api.vercel.app/${location}?page=${page}`);
        console.log("called!!!!!", data);

        return new NextResponse(JSON.stringify(data))
    } catch (error) {
        console.error("Error fetching data:", error);
        return new NextResponse("500 error", { status: 500 })
    }
}