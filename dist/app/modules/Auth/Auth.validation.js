"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required (zod)"
        }),
        email: zod_1.z.string({
            required_error: "email is required (zod)"
        }),
        password: zod_1.z.string({
            required_error: "password is required (zod)"
        }),
        role: zod_1.z.string({
            required_error: "role is required (zod)"
        }),
        contactNo: zod_1.z.string({
            required_error: "contactNo is required (zod)"
        }),
        address: zod_1.z.string({
            required_error: "address is required (zod)"
        }),
        profileImg: zod_1.z.string({
            required_error: "profileImg is required (zod)"
        })
    })
});
exports.AuthValidation = { createUser };
