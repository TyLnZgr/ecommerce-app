import { requireAdmin } from "@/lib/auth-guard";
import React from "react";

export default async function AdminProductsPage() {
  await requireAdmin();
  return <div>AdminProductsPage</div>;
}
