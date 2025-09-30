import { insertProductScheme } from "@/lib/validator";
import { z } from "zod";
export type Product = z.infer<typeof insertProductScheme> & {
  id: string;
  rating: string;
  createdAt: Date;
};
