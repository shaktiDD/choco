
import { create } from "domain";
import { sql } from "drizzle-orm";
import { pgTable, serial,varchar,text,timestamp, integer,index  } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    id: serial("id").primaryKey(),
    fname: varchar("fname",{length:100}).notNull(),
    lname: varchar("lname",{length:100}).notNull(),
    email: varchar("email",{length:100}).unique().notNull(),
    provider:varchar("provider",{length:20}).notNull(),
    external_id:varchar("external_id",{length:100}).notNull(),
    image:text("image"),
    role:varchar("role",{length:12}).notNull().default("customer"),
    upDatedAt:timestamp('upDate_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)

});

export const products = pgTable("products",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:100}).notNull(),
    image:text("image"),
    description:text("description"),
    price:integer("price").notNull(),
    upDatedAt:timestamp('upDate_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
})

export const warehouses = pgTable("warehouses",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:100}).notNull(),
    pincode:varchar("pincode",{length:6}).notNull(),
    upDatedAt:timestamp('upDate_at').default(sql`CURRENT_TIMESTAMP`),
    createdAt:timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
    
},(table)=>{
    return{
        pincodeIdx : index("pincode_idx",).on(table.pincode)
    }
})