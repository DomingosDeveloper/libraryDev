import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteBookController, IDeleteBookRepository } from "./protocols";

export class DeleteBookController implements IDeleteBookController{
        constructor(private readonly deleteBookRepository: IDeleteBookRepository){}
    async deleteBook(httpRequest: HttpRequest<any>): Promise<HttpResponse<Book>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id){
                return {
                    statusCode: 400,
                    body: "Missing book id.",
                };
            }

            const book = await this.deleteBookRepository.deleteBook(id);

            return {
                statusCode: 200,
                body: book,
            }
        } catch (error) {
            return {
                statusCode: 500,
                body:"Something went wrong.",
            };
        }
    }

}