import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateBookController, IUpdateBookRepository } from "./protocol";
import { UpdateBookParams } from "./protocol";

export class UpdateBookController implements IUpdateBookController{
        constructor (private readonly updateBookRepository: IUpdateBookRepository){}

    async updateBook(httpRequest: HttpRequest<any>): Promise<HttpResponse<Book>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            //validations
            if(!id){
                return {
                    statusCode: 400,
                    body: "Missing book id.",
                }
            }
            
            const allowedFieldToUpdate: (keyof UpdateBookParams)[] = ["subject", "quantity",]; 
            
            const fieldIsNotAllowedToUpdate = Object.keys(body).some(key =>
                !allowedFieldToUpdate.includes(key as keyof UpdateBookParams)
            );

            if(fieldIsNotAllowedToUpdate){
                return {
                    statusCode: 400,
                    body: "Some received field is not allowed to update."
                };
            }
            //end of validations
            
            const book = await this.updateBookRepository.updateBook(id, body);

            return {
                statusCode:200,
                body: book,
            };

        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong.",
            };
        }
    }
}