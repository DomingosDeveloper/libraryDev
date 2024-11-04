import express from 'express'
import { config } from 'dotenv'
import { GetBookController } from './controller/get-book/get-book';
import { MongoGetBooksRepository } from './repositories/get-books/mongo-get-books';
import { MongoClient } from './database/mongo';
import { MongoCreateBookRepository } from './repositories/create-book/mongo-create-book';
import { CreateBookController } from './controller/create-book/create-book';
import { MongoUpdateBookRepository } from './repositories/update-book/mongo-update-book';
import { UpdateBookController } from './controller/update-book/update-book';
import { MongoDeleteBookRepository } from './repositories/delete-book/mongo-delete-book';
import { DeleteBookController } from './controller/delete-book/delete-book';

const main = async () => {
    config();

    const app = express();
    app.use(express.json());
    
    const port = process.env.PORT || 3000;
    await MongoClient.connect();
    
    app.get('/books', async (req, res) =>{
        const mongoGetBooksRepository = new MongoGetBooksRepository();
        
        const getBookController = new GetBookController(mongoGetBooksRepository);
        
        const {body, statusCode} = await getBookController.getAllBooks({body: req.body, params: req.params});
        
        res.send(body).status(statusCode);
    });
    
    app.post('/books', async(req, res) => {
        const mongoCreateBooksRepository = new MongoCreateBookRepository();

        const createBookController = new CreateBookController(mongoCreateBooksRepository);

        const {body, statusCode} = await createBookController.createBook({
            body: req.body,
        });

        res.send(body).status(statusCode);
    });

    app.patch('/books/:id', async(req, res) =>{
        const mongoUpdateBookRepository = new MongoUpdateBookRepository();

        const updateBookController = new UpdateBookController(mongoUpdateBookRepository);
        
        const {body, statusCode} = await updateBookController.updateBook({
            body: req.body,
            params: req.params,
        });

        res.send(body).status(statusCode);
    });
    
    app.delete("/books/id", async(req, res) =>{
        const mongoDeleteBookRepository = new MongoDeleteBookRepository();

        const deleteBookController = new DeleteBookController(
            mongoDeleteBookRepository
        ); 

        const { body, statusCode} = await deleteBookController.deleteBook({
            params: req.params,
        });
    })
    
    app.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
};

main();