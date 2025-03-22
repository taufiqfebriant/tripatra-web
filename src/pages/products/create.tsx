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
import { CreateProductDocument } from "@/graphql-operations";
import type {
  CreateProductMutation,
  CreateProductMutationVariables,
} from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";

const createProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.coerce
    .number()
    .min(0, "Price must be greater than or equal to 0")
    .multipleOf(0.01, "Price must have at most 2 decimal places"),
  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock must be greater than or equal to 0"),
});

type CreateProductFormValues = z.infer<typeof createProductSchema>;

function CreateProductForm() {
  const router = useRouter();

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (input: CreateProductFormValues) => {
      return gqlClient.request<
        CreateProductMutation,
        CreateProductMutationVariables
      >(CreateProductDocument.toString(), {
        input,
      });
    },
    onSuccess: () => {
      router.push("/products");
    },
  });

  async function onSubmit(data: CreateProductFormValues) {
    mutation.mutate(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create Product</h1>
        <p className="text-sm text-muted-foreground">
          Add a new product to the system
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
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    placeholder="0"
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
                : "An error occurred while creating the product"}
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/products")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function CreateProduct() {
  return (
    <Layout>
      <div className="max-w-2xl">
        <CreateProductForm />
      </div>
    </Layout>
  );
}
