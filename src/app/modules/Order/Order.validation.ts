
import { z } from 'zod';
const createOrder = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'userId is Required (zod)',
    }),
    orderedBooks: z.array(
      z.object({
        bookId: z.string({
          required_error: 'bookId is Required (zod)',
        }),
        quantity: z.number({
          required_error: 'quantity is Required (zod)',
        }),
      })
    )
  }),
});

export const OrderValidation = { createOrder };


