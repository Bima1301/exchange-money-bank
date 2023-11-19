"use server"

import { exchangeSchema, exchangeType } from "@/libs/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createExchange = async (data: unknown) => {
    try {
        const result = exchangeSchema.safeParse(data);
        if (!result.success) {
            let zodErrors = {};
            if (!result.success) {
                zodErrors = result.error.flatten().fieldErrors

                return {
                    status: 'error',
                    type: 'validation',
                    message: 'Validation error.',
                    errors: zodErrors,
                }
            }

        }
        const { name, purpose, accountNumber, phoneNumber, totalExchange, datePickUp, timePickUp } = data as exchangeType;
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

        return {
            status: 'success',
            type: 'success',
            message: 'Exchange success.',
            data: exchangeData,
        }
    } catch (error) {
        return {
            status: 'error',
            type: 'error',
            message: 'Something went wrong.',
        }
    }
}

export default createExchange;