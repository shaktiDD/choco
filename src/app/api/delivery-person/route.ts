import { db } from "@/lib/db/db";
import { deliveryPersons } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPerson";

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