"use client";
import React, { useActionState } from "react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInDefaultValues } from "@/lib/constants";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/actions/user.actions";
import { useSearchParams } from "next/navigation";

export default function CredentialsSigninForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing In.." : "Sign In"}
      </Button>
    );
  };
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email" className="mb-2 ml-1">
            Email
          </Label>
          <Input
            name="email"
            id="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password" className="mb-2 ml-1">
            Password
          </Label>
          <Input
            name="password"
            id="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account ?{" "}
          <Link href="/sign-up" target="_self" className="link underline">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}
