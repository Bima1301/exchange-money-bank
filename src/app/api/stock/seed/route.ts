'use server'
import { NextRequest, NextResponse } from "next/server";
import { stock } from "@/libs/data";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const getAllStcok = await prisma.stock.findMany({ orderBy: { number: "asc" } });
        if (getAllStcok.length === 0) {
            await prisma.stock.createMany({
                data: stock
            });
            return NextResponse.json({ success: "Seeding Success" }, { status: 200 });
        }

        return NextResponse.json({ success: "Not Seeding" }, { status: 200 });

    } catch (error: any) {
        console.log(error, "ERROR");
        return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });

    }
}