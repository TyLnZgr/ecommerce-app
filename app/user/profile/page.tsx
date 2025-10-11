import React from "react";
import { auth } from "@/auth";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import UserForm from "./user-form";
export const metadata: Metadata = {
  title: "User Profile",
};
export default async function ProfilePage() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="h2-bold">Profile</h2>
        <UserForm />
      </div>
    </SessionProvider>
  );
}
