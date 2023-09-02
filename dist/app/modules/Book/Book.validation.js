"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title is Required (zod)',
        }),
        author: zod_1.z.string({
            required_error: 'author is Required (zod)',
        }),
        genre: zod_1.z.string({
            required_error: 'genre is Required (zod)',
        }),
        price: zod_1.z.number({
            required_error: 'price is Required (zod)',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'publicationDate is Required (zod)',
        }),
        categoryId: zod_1.z.string({
            required_error: 'categoryId is Required (zod)',
        }),
    }),
});
const updateBook = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        publicationDate: zod_1.z.string().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = { createBook, updateBook };
