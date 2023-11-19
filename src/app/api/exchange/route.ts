import { exchangeSchema, exchangeType } from "@/libs/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const result = exchangeSchema.safeParse(body);
        if (!result.success) {
            let zodErrors = {};
            if (!result.success) {
                zodErrors = result.error.flatten().fieldErrors
                return NextResponse.json({
                    status: 'error',
                    type: 'validation',
                    message: 'Validation error.',
                    errors: zodErrors,
                }, {
                    status: 400
                });
            }

        }
        const { name, purpose, accountNumber, phoneNumber, totalExchange, datePickUp, timePickUp } = body as any;
        //remove later index from totalExchange
        const newTotalExchange = totalExchange.filter((item: any) => item.fraction !== '' && item.total !== '');
        //remove id from newTotalExchange
        const newTotalExchangeWithoutId = newTotalExchange.map((item: any) => { return { fraction: item.fraction, total: item.total, type: item.type } });

        let startQueue = 0;
        const dateNow = new Date();
        const getLatestExchange = await prisma.exchange.findFirst({
            orderBy: {
                createdAt: "desc",
            },
        });
        if (getLatestExchange && getLatestExchange.createdAt.getDate() !== dateNow.getDate()) {
            startQueue = 1;
        } else {
            startQueue = getLatestExchange ? getLatestExchange.queue + 1 : 1;
        }

        const exchangeData = await prisma.exchange.create({
            data: {
                name,
                purpose,
                accountNumber,
                phoneNumber,
                totalExchange: {
                    create: newTotalExchangeWithoutId,
                },
                queue: startQueue,
                datePickUp: new Date(datePickUp),
                timePickUp,
            },
        });

        newTotalExchange.forEach(async (item: any) => {
            await prisma.stock.update({
                where: {
                    id: item.id,
                },
                data: {
                    quantity: {
                        decrement: item.total,
                    },
                },
            });
        });

        return NextResponse.json({
            status: 'success',
            type: 'success',
            message: 'Exchange success.',
            data: exchangeData,
        }, {
            status: 200
        });
        // return {
        //     status: 'success',
        //     type: 'success',
        //     message: 'Exchange success.',
        //     data: exchangeData,
        // }
    } catch (error: any) {
        console.log(error, "ERROR");

        // return {
        //     status: 'error',
        //     type: 'error',
        //     message: 'Something went wrong.',
        // }
        return NextResponse.json({
            status: 'error',
            type: 'error',
            message: 'Something went wrong.',
        }, {
            status: 500
        });
    }
}