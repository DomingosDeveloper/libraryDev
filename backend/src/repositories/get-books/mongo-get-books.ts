import { GetBookParams, IGetBookRepository } from "../../controller/get-book/protocols";
import { HttpRequest } from "../../controller/protocols";
import { MongoClient } from "../../database/mongo";
import { Book } from "../../models/book";

export class MongoGetBooksRepository implements IGetBookRepository {

    async getAllBooks(httpRequest : HttpRequest<GetBookParams>): Promise<Book[] | undefined> {
      const authorP = httpRequest?.params?.author;
      const subjectP = httpRequest?.params?.subject;
      
      if(httpRequest.params){
        const books = await MongoClient.db
              .collection<Book>("books")
              .find({...httpRequest.params = httpRequest.params})
              .toArray();

              return books.map(({ _id, ...rest}) => ({
                ...rest, 
                id: _id.toHexString(),
              }));
      }

      if(authorP){
        const booksAuthor = await MongoClient.db
        .collection<Book>("books")
        .find({author: authorP})
        .toArray();

        return booksAuthor.map(({ _id, ...rest}) => ({
          ...rest, 
        }));      
      }
  
      if(subjectP){
        const booksSubject = await MongoClient.db
        .collection<Book>("books")
        .find({subject: subjectP})
        .toArray();

        return booksSubject.map(({ _id, ...rest}) => ({
          ...rest, 
        }));      
      }
    }     
  }
