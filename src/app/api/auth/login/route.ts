import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { mobile, password } = body;

        console.log("Login attempt for mobile:", mobile);

        // Forward request to external API
        const apiRes = await fetch("http://148.72.244.77:5003/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mobile, password }),
        });

        const apiData = await apiRes.json();
        console.log("API Response:", apiData);

        // Return the response with proper status
        return NextResponse.json(apiData, { 
            status: apiRes.ok ? 200 : apiRes.status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    } catch (error) {
        console.error("Error in login route:", error);
        return NextResponse.json(
            { status: false, msg: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
