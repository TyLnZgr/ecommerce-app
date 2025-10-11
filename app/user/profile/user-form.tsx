"use client";
import { updateUserProfile } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUserProfileSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function UserForm() {
  const { data: session, update } = useSession();
  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "example@user.com",
    },
  });
  const onSubmit = async (values: z.infer<typeof updateUserProfileSchema>) => {
    const result = await updateUserProfile(values);
    if (!result.success) {
      return toast.error(result.message);
    }
    const newSession = {
      ...session,
      user: {
        ...session?.user,
        name: values.name,
      },
    };
    console.log("result", result);
    await update(newSession);
    toast(result.message);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled
                    className="input-field"
                    {...field}
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="input-field"
                    {...field}
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="button col-span-2 w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting.." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
