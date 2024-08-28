import { inventory } from "@/lib/db/schema";
import { inventorySchema } from "@/lib/validators/inventorySchema";
import { db } from "@/lib/db/db";
import { parse } from "path";

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