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
exports.UpdateBookController = void 0;
class UpdateBookController {
    constructor(updateBookRepository) {
        this.updateBookRepository = updateBookRepository;
    }
    updateBook(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                //validations
                if (!id) {
                    return {
                        statusCode: 400,
                        body: "Missing book id.",
                    };
                }
                const allowedFieldToUpdate = ["subject", "quantity",];
                const fieldIsNotAllowedToUpdate = Object.keys(body).some(key => !allowedFieldToUpdate.includes(key));
                if (fieldIsNotAllowedToUpdate) {
                    return {
                        statusCode: 400,
                        body: "Some received field is not allowed to update."
                    };
                }
                //end of validations
                const book = yield this.updateBookRepository.updateBook(id, body);
                return {
                    statusCode: 200,
                    body: book,
                };
            }
            catch (error) {
                return {
                    statusCode: 500,
                    body: "Something went wrong.",
                };
            }
        });
    }
}
exports.UpdateBookController = UpdateBookController;
