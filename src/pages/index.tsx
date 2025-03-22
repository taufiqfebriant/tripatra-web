import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MeDocument } from "@/graphql-operations";
import type {
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
} from "@/graphql/graphql";
import { LoginDocument } from "@/graphql/graphql";
import { cn, gqlClient, setGraphQLAuthorization } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: LoginFormValues) => {
      return gqlClient.request<LoginMutation, LoginMutationVariables>(
        LoginDocument.toString(),
        {
          input,
        }
      );
    },
  });

  async function onSubmit(data: LoginFormValues) {
    mutation.mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.login.accessToken);
        setGraphQLAuthorization(data.login.accessToken);
        router.push("/home");
      },
      onError: (error) => {
        if (error instanceof Error) {
          form.setError("root", {
            message: "Invalid email or password",
          });
        }
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              {form.formState.errors.root ? (
                <div className="rounded-md bg-destructive/15 px-3 py-2 text-sm text-destructive">
                  {form.formState.errors.root.message}
                </div>
              ) : null}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
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
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const result = await gqlClient.request<MeQuery>(MeDocument.toString());
        router.push("/home");
        return result;
      } catch {
        return null;
      }
    },
    retry: false,
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
