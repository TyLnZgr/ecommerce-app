import { requireAdmin } from "@/lib/auth-guard";
import React from "react";

export default async function AdminUsersPage() {
  await requireAdmin();
  return <div>AdminUsersPage</div>;
}
