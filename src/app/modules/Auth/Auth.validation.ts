import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required (zod)',
    }),
    email: z.string({
      required_error: 'email is required (zod)',
    }),
    password: z.string({
      required_error: 'password is required (zod)',
    }),
    role: z.string({
      required_error: 'role is required (zod)',
    }),
    contactNo: z.string({
      required_error: 'contactNo is required (zod)',
    }),
    address: z.string({
      required_error: 'address is required (zod)',
    }),
    profileImg: z.string({
      required_error: 'profileImg is required (zod)',
    }),
  }),
});
const loginUser = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required (zod)',
    }),
    password: z.string({
      required_error: 'password is required (zod)',
    }),
  }),
});

export const AuthValidation = { createUser, loginUser };
