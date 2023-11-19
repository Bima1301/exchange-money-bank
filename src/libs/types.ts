import { z } from "zod";

// const totalExchangeItem = z.object({
//     fraction: z.number(),
//     total: z.number(),
//     type: z.string(),
// })


export const exchangeSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(255),
    purpose: z.string().min(3, 'Purpose must be at least 3 characters').max(255),
    accountNumber: z.string().min(3, 'Account number must be at least 3 characters').max(255),
    phoneNumber: z.string().min(3, 'Phone number must be at least 3 characters').max(14),
    // totalExchange: z.array(totalExchangeItem),
    datePickUp: z.string().min(3, 'Date must be at least 3 characters').max(255),
    timePickUp: z.string().min(3, 'Time must be at least 3 characters').max(255),
})

export type TExchangeSchema = z.infer<typeof exchangeSchema>;

export type exchangeType = {
    name: string,
    purpose: string,
    accountNumber: string,
    phoneNumber: string,
    totalExchange: {
        id: string,
        fraction: number,
        total: number,
        type: string,
    }[],
    datePickUp: string,
    timePickUp: string,
}