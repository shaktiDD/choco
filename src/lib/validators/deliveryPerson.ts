import {z} from 'zod';
export const deliveryPersonSchema = z.object({
    name:z.string({message: 'Name must be a string'}),
    phone: z.string({message: 'Phone number must be a string'}).length(10),
    warehouseId: z.number({message: 'Warehouse id must be a number'})
})