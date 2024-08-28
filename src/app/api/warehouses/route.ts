import  {warehouseSchema}  from "@/lib/validators/warehouseSchema";
import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";

export async function POST(req:Request) {
    const requestData = await req.json();
    let validateData;
    try {
        validateData = warehouseSchema.parse({
            name: requestData.name,
            pincode: requestData.pincode
        });
    } catch (err: any) {
        return Response.json({ message: err.message }, { status: 400 });
    }
    try{
        await db.insert(warehouses).values(validateData);
        return Response.json({message: "Warehouse stored successfully"}, {status: 201});
    }catch(err){
        return Response.json({message: "Failed to store to  warehouse"}, {status: 500});
    }
    
}