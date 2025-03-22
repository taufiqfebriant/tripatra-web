import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GetUserDocument, UpdateUserDocument } from "@/graphql-operations";
import type {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const editUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

type EditUserFormValues = z.infer<typeof editUserSchema>;

function EditUserForm({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      gqlClient.request<GetUserQuery, GetUserQueryVariables>(
        GetUserDocument.toString(),
        { id }
      ),
  });

  const form = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (data?.user) {
      form.reset({
        name: data.user.name,
        email: data.user.email,
        password: "",
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (input: EditUserFormValues) => {
      // Remove password field if it's empty
      const cleanedInput = {
        ...input,
        password: input.password || undefined,
      };
      return gqlClient.request<UpdateUserMutation, UpdateUserMutationVariables>(
        UpdateUserDocument.toString(),
        {
          id,
          input: cleanedInput,
        }
      );
    },
    onSuccess: () => {
      router.push(`/users/${id}`);
    },
  });

  async function onSubmit(data: EditUserFormValues) {
    mutation.mutate(data);
  }

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  if (!data?.user) {
    return <div>User not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit User</h1>
        <p className="text-sm text-muted-foreground">Update user information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Leave blank to keep current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mutation.error && (
            <div className="text-sm font-medium text-destructive">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "An error occurred while updating the user"}
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/users/${id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-2xl">
        <EditUserForm id={id} />
      </div>
    </Layout>
  );
}
