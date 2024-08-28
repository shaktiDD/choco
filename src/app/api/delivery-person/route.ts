import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPerson";
import { desc, eq } from "drizzle-orm";

export async function POST(req: Request) {
    const requestData = await req.json();
    let validateData;
    try{
        validateData = await deliveryPersonSchema.parse(requestData); 
    }catch(err: any){
        return Response.json({message: err.message}, {status: 400});
    }
    try{
        await db.insert(deliveryPersons).values(validateData);
        return Response.json({message: "Delivery person stored successfully"}, {status: 201});
    }catch(err){
        return Response.json({message: "Failed to store delivery person"}, {status: 500});
    }
}

export async function GET(req: Request) {
    try{
        const allDeliveryPersons = await db.select({
            id: deliveryPersons.id,
            name: deliveryPersons.name,
            phone: deliveryPersons.phone,
            warehouse: {
                name: warehouses.name
            }
        }).from(deliveryPersons).leftJoin(warehouses,eq(deliveryPersons.warehouseId,warehouses.id)).orderBy(desc(deliveryPersons.id));
        return Response.json(allDeliveryPersons, {status: 200});
    }catch(err){
        return Response.json({message: "Failed to fetch delivery persons"}, {status: 500});
    }
}