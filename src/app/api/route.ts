import { NextResponse } from "next/server";

export async function GET() {
    try {
        return NextResponse.json({ success: true, message: "This is a basic Next.js BCMS API" });
    } catch (error) {
        console.error("Failed to fetch support requests:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch support requests" }, { status: 500 });
    }
}