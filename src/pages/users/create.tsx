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
import { CreateUserDocument } from "@/graphql-operations";
import type {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

function CreateUserForm() {
  const router = useRouter();

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: CreateUserFormValues) => {
      return gqlClient.request<CreateUserMutation, CreateUserMutationVariables>(
        CreateUserDocument.toString(),
        {
          input,
        }
      );
    },
    onSuccess: () => {
      router.push("/users");
    },
  });

  async function onSubmit(data: CreateUserFormValues) {
    mutation.mutate(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create User</h1>
        <p className="text-sm text-muted-foreground">
          Add a new user to the system
        </p>
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mutation.error && (
            <div className="text-sm font-medium text-destructive">
              {mutation.error instanceof Error
                ? mutation.error.message
                : "An error occurred while creating the user"}
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/users")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function CreateUser() {
  return (
    <Layout>
      <div className="max-w-2xl">
        <CreateUserForm />
      </div>
    </Layout>
  );
}
