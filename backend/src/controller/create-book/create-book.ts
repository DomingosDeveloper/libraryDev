import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateBookParams, ICreateBookController, ICreateBookRepository } from "./protocols";
 
export class CreateBookController implements ICreateBookController {
    constructor(private readonly createBookRepository : ICreateBookRepository){}

    async createBook(httpRequest: HttpRequest<CreateBookParams>): Promise<HttpResponse<Book>>{
        try {
        
            const requiredFields = ["title", "author", "publishedYear", "subject", "quantity"];
            //validations
            for (const field of requiredFields){
                if (!httpRequest?.body?.[field as keyof CreateBookParams]?.length){
                        return {
                           statusCode: 400,
                           body: `Field ${field} is required`,
                        };
                }
            }

            if(httpRequest.body?.publishedYear.length != 10){
                return {
                    statusCode: 400,
                    body: `Published Year must be 10 chars long.`,
                 };
            }

            if(+httpRequest.body?.quantity <= 0){
                return{
                    statusCode: 400,
                    body: "Quantity must be higher than 0.",
                };
            }
            //end of validations
            const book = await this.createBookRepository.createBook(httpRequest.body!);
            return {
                statusCode: 201,
                body: book!,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Something went wrong."
            };
        }
    }
}