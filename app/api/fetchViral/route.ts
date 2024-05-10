import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch("https://pagal-music-api.vercel.app/top-virals",{
            next:{
                revalidate: 3600
            }
            // cache: "no-cache"
        })
        return new NextResponse(JSON.stringify(await res.json()))
    } catch (error) {
        return new NextResponse("500 error",{status: 500})
    }
}