import { signOutUser } from "@/actions/user.actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function UserButton() {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href="/sign-in">
          <UserIcon /> Sign In
        </Link>
      </Button>
    );
  }
  const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? "";
  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="center" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none ml-1">
                {session.user?.name}
              </div>
              <div className="text-sm text-muted-foreground leading-none mt-2 ml-1">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/user/orders" className="w-full">
              Order History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/orders" className="w-full">
              User Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form action={signOutUser} className="w-full">
              <Button
                className="w-fit py-4 px-2 h-4 justify-start"
                variant="outline"
              >
                <LogOut />
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
