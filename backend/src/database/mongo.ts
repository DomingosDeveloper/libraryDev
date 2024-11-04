import {MongoClient as Mongo, Db} from 'mongodb';

export const MongoClient = {
    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,
    
    async connect(): Promise<void> {
        try{ 
            const url= process.env.MONGODB_URL || 'mongodb+srv://cluster0.cmly3.mongodb.net';
            const username= process.env.MONGODB_USERNAME!;
            const password = process.env.MONGODB_PASSWORD!;
        
            const client = new Mongo(url, {auth: {username, password}});
            const db = client.db("books-db");
    
            this.client = client;
            this.db = db;
            console.log("MongoDB on!");
        } catch {
            throw new Error("MongoDB not connected!")
        }
    },
}