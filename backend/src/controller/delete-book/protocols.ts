import { Book } from "../../models/book";
import { HttpResponse } from "../protocols";

export interface IDeleteBookController{
    deleteBook(httpRequest : HttpResponse<any>): Promise<HttpResponse<Book>>;
}

export interface IDeleteBookRepository{
    deleteBook(id: string): Promise<Book>;
}
