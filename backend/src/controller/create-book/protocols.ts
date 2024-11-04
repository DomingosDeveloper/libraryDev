import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";

export interface ICreateBookController{
    createBook(httpRequest: HttpRequest<CreateBookParams>): Promise<HttpResponse<Book>>;
}

export interface ICreateBookRepository{
    createBook(params: CreateBookParams): Promise <Book>;
}

export interface CreateBookParams{
    title: string;
    author: string;
    publishedYear: string;
    subject: string;
    quantity: string;
}