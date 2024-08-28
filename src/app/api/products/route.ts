import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import { db } from "@/lib/db/db";
import  fs  from "fs";
import path from "path";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
    const data = await req.formData();

    let validateData;
    try {
        validateData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image')
        });
    } catch (err: any) {
        return Response.json({ message: err.message }, { status: 400 });
    }

    const filename = `${Date.now()}.${validateData.image.name.split('.').slice(-1)[0]}`;
    console.log(filename);
    try {
        const buffer = Buffer.from(await validateData.image.arrayBuffer());
        await writeFile(path.join(process.cwd(), 'public/assets', filename), buffer);
        console.log(filename);

    } catch (error) {
        return Response.json({ message: 'Error while uploading image' }, { status: 500 });

    }
    try{
        console.log(validateData.price);
        await db.insert(products).values({
            name: validateData.name,
            description: validateData.description,
            price: validateData.price,
            image: filename
        });

    }catch(err){
        await fs.promises.unlink(path.join(process.cwd(), 'public/assets', filename));
        console.log(err);
        return Response.json({ message: err }, { status: 500 });
    }

    return Response.json({ message: "Product stored successfully" }, { status: 201 });
}

export async function GET(req: Request) {
    try{
        const allProducts = await db.select().from(products).orderBy(desc(products.id));
        return Response.json(allProducts);
    }catch(err){
        return Response.json({message: err}, {status: 500})
    }
}