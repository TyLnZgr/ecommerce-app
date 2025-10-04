"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/actions/cart.actions";
import { toast } from "sonner";
import { useTransition } from "react";

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      // Execute the addItemToCart action
      const res = await addItemToCart(item);
      // Display appropriate toast message based on the result
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast(res.message, {
        className: "bg-primary text-white hover:bg-gray-800",
        position: "top-right",
        action: {
          label: "Go to Cart",
          onClick: () => router.push("/cart"),
        },
      });
    });
  };
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast(res.message, {
        className: "bg-primary text-white hover:bg-gray-800",
        position: "bottom-right",
      });
      return;
    });
  };
  const existItem =
    cart && cart?.items.find((x) => x.productId === item.productId);
  return existItem ? (
    <div>
      <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
        {pending ? (
          <Loader className="w-4 h-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.quantity}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {pending ? (
          <Loader className="w-4 h-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full mt-2" type="button" onClick={handleAddToCart}>
      {pending ? <Loader className="w-4 h-4" /> : <Plus className="h-4 w-4" />}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
