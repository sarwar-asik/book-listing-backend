"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const createOrder = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'userId is Required (zod)',
        }),
        orderedBooks: zod_1.z.array(zod_1.z.object({
            bookId: zod_1.z.string({
                required_error: 'bookId is Required (zod)',
            }),
            quantity: zod_1.z.number({
                required_error: 'quantity is Required (zod)',
            }),
        }))
    }),
});
exports.OrderValidation = { createOrder };
