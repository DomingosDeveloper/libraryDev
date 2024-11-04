import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";
import { GetBookParams, IGetBookController, IGetBookRepository } from "./protocols";
 
export class GetBookController implements IGetBookController {
    constructor(private readonly getBooksRepository: IGetBookRepository){}
    
    async getAllBooks(httpRequest : HttpRequest<any>): Promise<HttpResponse<Book[] | string | undefined>>{
        try{
             const books = await this.getBooksRepository.getAllBooks(httpRequest.params) ;
            
             return {
                statusCode: 200,
                body : books,
             };
        } catch (error){
            return {
                statusCode: 500,
                body: 'Something went wrong.',
            };
        }
    }
}