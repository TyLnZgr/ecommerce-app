"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/actions/cart.actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

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
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } flex items-center justify-between max-w-sm w-full bg-primary text-white shadow-lg rounded-lg px-4 py-3`}
        >
          <span>{res.message}</span>
          <button
            onClick={() => {
              router.push("/cart");
              toast.dismiss(t.id);
            }}
            className="ml-3 bg-white text-primary px-3 py-1 rounded hover:bg-gray-100 text-sm font-medium"
          >
            Go to Cart
          </button>
        </div>
      ));
    });
  };
  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);
      toast.success(res.message, {
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
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.quantity}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart}>
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button className="w-full mt-2" type="button" onClick={handleAddToCart}>
      {pending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Plus className="h-4 w-4" />
      )}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
