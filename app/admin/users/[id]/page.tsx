import { getUserById } from "@/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import UpdateUserForm from "./update-form";
export const metadata: Metadata = {
  title: "Admin User Update",
};
export default async function UserEditPage(props: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await props.params;
  const user = await getUserById(id);
  if (!user) notFound();

  return (
    <div className="space-y-8 max-w-lg mx-auto">
      <h1 className="h2-bold">Update User</h1>
      <UpdateUserForm user={user} />
    </div>
  );
}
