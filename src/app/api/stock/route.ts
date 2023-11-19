import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
    try {
        const dateNow = new Date();
        const getLatestExchange = await prisma.exchange.findFirst({
            orderBy: {
                createdAt: "desc"
            }
        });

        if (getLatestExchange && getLatestExchange.createdAt.getDate() !== dateNow.getDate()) {
            await prisma.stock.updateMany({
                data: {
                    quantity: 2000
                }
            });
        }

        const stocks = await prisma.stock.findMany({
            orderBy: {
                number: "asc"
            }
        });

        return NextResponse.json({ stock: stocks }, { status: 200 });
    } catch (error: any) {
        console.log(error, "ERROR");
        return NextResponse.json({ error: "Something went wrong", details: error.message }, { status: 500 });

    }
}