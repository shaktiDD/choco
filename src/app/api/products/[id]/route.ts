import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db/db";

export async function GET(req: Request,{params}: {params: {id: string}}) {
    const id =Number(params.id);
    try{
        const product = await db.select().from(products).where(eq(products.id, id));
        if(product.length === 0){
            return Response.json({message: 'Product not found'}, {status: 404});
        }else{
            return Response.json(product[0]);
        }
        
    }catch(err){
        return Response.json({message: "failed to fetch a product"}, {status: 500})
    }
    
    
}