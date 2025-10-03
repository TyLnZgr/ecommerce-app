"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
interface Props {
  callbackUrl?: string;
}
export default function SignInWithGoogle({ callbackUrl }: Props) {
  return (
    <Button
      onClick={() => signIn("google", { callbackUrl: callbackUrl || "/" })}
      variant="default"
      className="w-full"
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#4285f4" d="..." />
        <path fill="#34a853" d="..." />
        <path fill="#fbbc04" d="..." />
        <path fill="#ea4335" d="..." />
      </svg>
      <GoogleIcon className="w-5 h-5" /> Sign in with Google
    </Button>
  );
}
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 533.5 544.3"
    fill="currentColor"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.3-1.4-34-4.2-50.3H272v95.1h146.9c-6.3 33.9-25.2 62.6-53.9 81.9v68.2h87.1c51-46.9 80.4-116 80.4-194.9z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.9 0 134.1-24.1 178.8-65.6l-87.1-68.2c-24.2 16.3-55.2 26-91.7 26-70.5 0-130-47.6-151.3-111.3H33.3v69.8C77.9 481 168.8 544.3 272 544.3z"
    />
    <path
      fill="#FBBC04"
      d="M120.7 322.9c-11.8-34.9-11.8-72.9 0-107.8v-69.8H33.3c-24.2 47.5-24.2 104.4 0 151.9l87.4-74.3z"
    />
    <path
      fill="#EA4335"
      d="M272 107.5c37.5-.6 71.3 12.9 97.9 37.3l73.2-73.2C404.2 25 342.9 0 272 0 168.8 0 77.9 63.3 33.3 151.1l87.4 69.8c21.3-63.7 80.8-111.3 151.3-111.3z"
    />
  </svg>
);
