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
import {
  GetProductDocument,
  UpdateProductDocument,
} from "@/graphql-operations";
import type {
  GetProductQuery,
  GetProductQueryVariables,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const editProductSchema = z.object({
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

type EditProductFormValues = z.infer<typeof editProductSchema>;

function EditProductForm({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      gqlClient.request<GetProductQuery, GetProductQueryVariables>(
        GetProductDocument.toString(),
        { id }
      ),
  });

  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    if (data?.product) {
      form.reset({
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
      });
    }
  }, [data, form]);

  const mutation = useMutation({
    mutationFn: (input: EditProductFormValues) => {
      return gqlClient.request<
        UpdateProductMutation,
        UpdateProductMutationVariables
      >(UpdateProductDocument.toString(), {
        id,
        input,
      });
    },
    onSuccess: () => {
      router.push(`/products/${id}`);
    },
  });

  async function onSubmit(data: EditProductFormValues) {
    mutation.mutate(data);
  }

  if (isLoadingProduct) {
    return <div>Loading...</div>;
  }

  if (!data?.product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <p className="text-sm text-muted-foreground">
          Update product information
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
                : "An error occurred while updating the product"}
            </div>
          )}
          <div className="flex gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/products/${id}`)}
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

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-2xl">
        <EditProductForm id={id} />
      </div>
    </Layout>
  );
}
