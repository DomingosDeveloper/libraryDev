import { ObjectId } from "mongodb";
import { IDeleteBookRepository } from "../../controller/delete-book/protocols";
import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/book";

export class MongoDeleteBookRepository implements IDeleteBookRepository{
    async deleteBook(id: string): Promise<Book>{
        const book = await MongoClient.db
            .collection<Omit<Book, 'id'>>("books")
            .findOne({_id: new ObjectId});

        //validacoes
        if (!book){
            throw new Error("Book not found.");
        }

        const {deletedCount} = await MongoClient.db
            .collection("books")
            .deleteOne({_id: new ObjectId(id)});

        if(!deletedCount){
            throw new Error("Book not deleted.");
        }

        const { _id, ...rest} = book;
        return {id: _id.toHexString(),
            ...rest,
        }
    }
}