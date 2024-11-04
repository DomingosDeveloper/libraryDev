import { ObjectId } from "mongodb";
import { IUpdateBookRepository, UpdateBookParams } from "../../controller/update-book/protocol";
import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/book";

export class MongoUpdateBookRepository implements IUpdateBookRepository {
    async updateBook(id: string, params: UpdateBookParams): Promise<Book> {
        await MongoClient.db
                .collection("books")
                .updateOne(
                    {_id: new ObjectId(id)}, 
                    {
                    $set: {
                        ...params,
                    },
                }
            );

        const book = await MongoClient.db
                            .collection<Omit<Book, "id">>("books")
                            .findOne({ _id: new ObjectId(id)});
                            
        if(!book){
            throw new Error("Book not updated.");
        }

        const { _id, ...rest} = book;

        return {id: _id.toHexString(), ...rest};
    }
}