import React from "react";
import Image from "next/image";
import loader from "@/assets/loading.gif";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Image src={loader} alt="Loading.." width={150} height={150} />
    </div>
  );
}
