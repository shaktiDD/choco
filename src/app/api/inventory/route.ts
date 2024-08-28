import { inventory, products, warehouses } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { db } from "@/lib/db/db";
import { desc, eq } from "drizzle-orm";

export async function POST(req:Request) {
    const requestData = await req.json();
    let validateData;
    try{
        validateData = inventorySchema.parse(requestData)
    }catch(err: any){
        return Response.json({message: err.message}, {status: 400});
    }

    try{
        await db.insert(inventory).values(validateData);
        return Response.json({message: "Inventory stored successfully"}, {status: 201});
    }catch(err){
        return Response.json({message: err}, {status: 500});
    }
}

export async function GET(req:Request) {
    try{
        const allInventory = await db.select({
            id:inventory.id,
            sku:inventory.sku,
            warehouse:warehouses.name,
            product:products.name,

        }).from(inventory)
        .leftJoin(warehouses,eq(inventory.warehouseId,warehouses.id))
        .leftJoin(products,eq(inventory.productId,products.id))
        .orderBy(desc(inventory.id));
        return Response.json(allInventory, {status: 200});
    }catch(err){
        return Response.json({message: err}, {status: 500});
    }
}