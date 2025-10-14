import React from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Menu from "./Menu";
import CategoryDrawer from "./category-drawer";
import Search from "./search";
export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrawer />
          <Link href="/" className="flex-start ml-4">
            <div className="flex-start">
              <Image
                src="/images/logo.png"
                alt={`${APP_NAME} logo`}
                width={48}
                height={48}
                priority
              />

              <span className="hidden lg:block font-bold text-2xl ml-3">
                {APP_NAME}
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden md:block">
          <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
}
