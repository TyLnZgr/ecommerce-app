import { getAllCategories } from "@/actions/product.actions";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function CategoryDrawer() {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Select a Category</DrawerTitle>
          <div className="space-y-1 mt-4">
            {categories.map((category) => (
              <Button
                variant="link"
                key={category.category}
                asChild
                className="w-full justify-start"
              >
                <DrawerClose asChild>
                  <Link href={`/search?:category=${category.category}`}>
                    {category.category}({category._count})
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
