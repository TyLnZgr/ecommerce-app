"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";
export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/images/logo.png"
        alt={`${APP_NAME} logo`}
        height={48}
        width={48}
        priority
      />
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-4">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => router.push("/")}
        >
          <ArrowBigLeft className="h-5 w-5" />
          Back To Home
        </Button>
      </div>
    </div>
  );
}
