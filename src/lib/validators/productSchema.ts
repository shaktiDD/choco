import { desc } from 'drizzle-orm';
import { z } from 'zod';
export const productSchema = z.object({
    name: z.string({message: 'Name must be a string'}),
    image:z.instanceof(File,{message: 'Product image shoul be image'}),
    description: z.string({message: 'Description must be a string'}),
    price: z.number({message: 'Price must be a number'})

})