
import { z } from 'zod';
const createBook = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is Required (zod)',
    }),
    author: z.string({
      required_error: 'author is Required (zod)',
    }),
    genre: z.string({
      required_error: 'genre is Required (zod)',
    }),
    price: z.string({
      required_error: 'price is Required (zod)',
    }),
    publicationDate: z.string({
      required_error: 'publicationDate is Required (zod)',
    }),
    categoryId: z.string({
      required_error: 'categoryId is Required (zod)',
    }),
  }),
});
const updateBook = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    price: z.string().optional(),
    publicationDate: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const BookValidation = { createBook ,updateBook};


