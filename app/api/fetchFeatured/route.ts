import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const page = searchParams.get('page') || 1;
    const location = searchParams.get('location');
    try {
        const res = await fetch(`https://pagal-music-api.vercel.app/${location}?page=${page}`,{
            next:{
                revalidate: 3600
            }
            // cache: "no-cache"
        })
        console.log("called!!!!!");
        
        return new NextResponse(JSON.stringify(await res.json()))
    } catch (error) {
        return new NextResponse("500 error",{status: 500})
    }
}