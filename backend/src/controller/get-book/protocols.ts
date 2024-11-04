import { Book } from "../../models/book";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IGetBookController{
    getAllBooks(httpRequest : HttpRequest<any>): Promise<HttpResponse<Book[] | string | undefined>>;
}

export interface IGetBookRepository{
    getAllBooks(params : HttpRequest<GetBookParams>): Promise <Book[] | string | undefined>;
}

export interface GetBookParams{
    title?: string;
    author?: string;
    publishedYear?: string;
    subject?: string;
    quantity?: string;
}
