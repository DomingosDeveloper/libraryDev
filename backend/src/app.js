"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const get_book_1 = require("./controller/get-book/get-book");
const mongo_get_books_1 = require("./repositories/get-books/mongo-get-books");
const mongo_1 = require("./database/mongo");
const mongo_create_book_1 = require("./repositories/create-book/mongo-create-book");
const create_book_1 = require("./controller/create-book/create-book");
const mongo_update_book_1 = require("./repositories/update-book/mongo-update-book");
const update_book_1 = require("./controller/update-book/update-book");
const mongo_delete_book_1 = require("./repositories/delete-book/mongo-delete-book");
const delete_book_1 = require("./controller/delete-book/delete-book");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dotenv_1.config)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const port = process.env.PORT || 3000;
    yield mongo_1.MongoClient.connect();
    app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const mongoGetBooksRepository = new mongo_get_books_1.MongoGetBooksRepository();
        const getBookController = new get_book_1.GetBookController(mongoGetBooksRepository);
        const { body, statusCode } = yield getBookController.getAllBooks();
        res.send(body).status(statusCode);
    }));
    app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const mongoCreateBooksRepository = new mongo_create_book_1.MongoCreateBookRepository();
        const createBookController = new create_book_1.CreateBookController(mongoCreateBooksRepository);
        const { body, statusCode } = yield createBookController.createBook({
            body: req.body,
        });
        res.send(body).status(statusCode);
    }));
    app.patch('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const mongoUpdateBookRepository = new mongo_update_book_1.MongoUpdateBookRepository();
        const updateBookController = new update_book_1.UpdateBookController(mongoUpdateBookRepository);
        const { body, statusCode } = yield updateBookController.updateBook({
            body: req.body,
            params: req.params,
        });
        res.send(body).status(statusCode);
    }));
    app.delete("/books/id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const mongoDeleteBookRepository = new mongo_delete_book_1.MongoDeleteBookRepository();
        const deleteBookController = new delete_book_1.DeleteBookController(mongoDeleteBookRepository);
        const { body, statusCode } = yield deleteBookController.deleteBook({
            params: req.params,
        });
    }));
    app.listen(port, () => {
        console.log(`Listening on port ${port}!`);
    });
});
main();
