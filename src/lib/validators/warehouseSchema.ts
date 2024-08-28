import {z} from 'zod';
export const warehouseSchema = z.object({
    name: z.string({message: 'Name must be a string'}),
    pincode: z.string({message: 'Pincode must be a string'}).length(6),
})