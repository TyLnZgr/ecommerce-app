import {
  cartItemSchema,
  insertCartSchema,
  insertProductScheme,
} from "@/lib/validator";
import { z } from "zod";
export type Product = z.infer<typeof insertProductScheme> & {
  id: string;
  rating: string;
  createdAt: Date;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
