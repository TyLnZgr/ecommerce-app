"use client";
import React, { useActionState } from "react";
import Link from "next/link";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpDefaultValues } from "@/lib/constants";
import { useFormStatus } from "react-dom";
import { signUp } from "@/actions/user.actions";
import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const [data, action] = useActionState(signUp, {
    success: false,
    message: "",
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting" : "Sign Up"}
      </Button>
    );
  };
  console.log("data", data);
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name" className="mb-2 ml-1">
            Name
          </Label>
          <Input
            name="name"
            id="name"
            type="text"
            autoComplete="name"
            defaultValue={signUpDefaultValues.name}
          />
        </div>
        <div>
          <Label htmlFor="email" className="mb-2 ml-1">
            Email
          </Label>
          <Input
            name="email"
            id="email"
            type="text"
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
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
            defaultValue={signUpDefaultValues.password}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="mb-2 ml-1">
            Confirm Password
          </Label>
          <Input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account ?{" "}
          <Link href="/sign-in" target="_self" className="link underline">
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}
