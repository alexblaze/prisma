import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    if (!userId) return new NextResponse("Unauthorised", { status: 401 });
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("🚀 ~ file: routes.ts:7 ~ error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
