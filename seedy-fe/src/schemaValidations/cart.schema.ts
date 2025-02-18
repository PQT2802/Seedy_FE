import z from "zod";

export const GetCartRes = z.object({
  statusCode: z.number(),
  title: z.string(),
  type: z.string().url(),
  extensions: z.object({
    message: z.string(),
    data: z.object({
      cartID: z.string().uuid(),
      userID: z.string().uuid(),
      cartItems: z.record(
        z.string().uuid(),
        z.object({
          productId: z.string().uuid(),
          productName: z.string(),
          productPrice: z.number(),
          productImageUrl: z.string(),
          productStockQuantity: z.number(),
          quantity: z.number(),
        })
      ),
    }),
  }),
});

export type GetCartResType = z.infer<typeof GetCartRes>;
