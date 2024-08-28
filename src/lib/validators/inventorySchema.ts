import {z} from 'zod';
export const inventorySchema = z.object({
    sku: z.string({message: 'SKU must be a string'}),   
    warehouseId: z.number({message: 'Warehouse id must be a number'}),
    productId: z.number({message: 'Product id must be a number'}),
})