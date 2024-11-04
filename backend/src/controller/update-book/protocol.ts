import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateBookRepository {
    updateBook(id: string, params: UpdateBookParams): Promise<Book>;
}

export interface IUpdateBookController {
    updateBook(httpRequest : HttpRequest<UpdateBookParams>): Promise<HttpResponse<Book>>;
}

export interface UpdateBookParams{
    subject: string;
    quantity: string;
}