"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
type IProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};
export default function Pagination({ page, totalPages, urlParamName }: IProps) {
  const router = useRouter();
  const searchPrams = useSearchParams();
  console.log("page, totalPages", page, totalPages);
  const handleClick = (btnType: string) => {
    const pageValue = btnType === "prev" ? Number(page) - 1 : Number(page) + 1;
    const newUrl = formUrlQuery({
      params: searchPrams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl);
  };

  return (
    <div className="flex gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
      >
        Previous
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-28"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next
      </Button>
    </div>
  );
}
