"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export default function AdminSearch() {
  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");
  const pathName = usePathname();
  const formActionUrl = pathName.includes("/admin/orders")
    ? "/admin/orders"
    : pathName.includes("/admin/products")
    ? "/admin/products"
    : "/admin/users";
  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);
  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        placeholder="Search"
        name="query"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className="md:w-[100px] lg:w-[300px]"
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
}
