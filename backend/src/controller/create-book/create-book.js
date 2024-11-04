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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookController = void 0;
class CreateBookController {
    constructor(createBookRepository) {
        this.createBookRepository = createBookRepository;
    }
    createBook(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const requiredFields = ["title", "author", "publishedYear", "subject", "quantity"];
                //validations
                for (const field of requiredFields) {
                    if (!((_b = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.length)) {
                        return {
                            statusCode: 400,
                            body: `Field ${field} is required`,
                        };
                    }
                }
                if (((_c = httpRequest.body) === null || _c === void 0 ? void 0 : _c.publishedYear.length) != 10) {
                    return {
                        statusCode: 400,
                        body: `Published Year must be 10 chars long.`,
                    };
                }
                if (+((_d = httpRequest.body) === null || _d === void 0 ? void 0 : _d.quantity) <= 0) {
                    return {
                        statusCode: 400,
                        body: "Quantity must be higher than 0.",
                    };
                }
                //end of validations
                const book = yield this.createBookRepository.createBook(httpRequest.body);
                return {
                    statusCode: 201,
                    body: book,
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: "Something went wrong."
                };
            }
        });
    }
}
exports.CreateBookController = CreateBookController;
