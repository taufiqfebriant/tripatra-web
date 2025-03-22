import { Layout } from "@/components/layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DeleteProductDocument,
  GetProductDocument,
} from "@/graphql-operations";
import type {
  DeleteProductMutation,
  DeleteProductMutationVariables,
  GetProductQuery,
  GetProductQueryVariables,
} from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function ProductDetail({ id }: { id: string }) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      gqlClient.request<GetProductQuery, GetProductQueryVariables>(
        GetProductDocument.toString(),
        { id }
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => {
      return gqlClient.request<
        DeleteProductMutation,
        DeleteProductMutationVariables
      >(DeleteProductDocument.toString(), { id: productId });
    },
    onSuccess: () => {
      router.push("/products");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.product) {
    return <div>Product not found</div>;
  }

  const { product } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Details</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/products" className="flex items-center">
              Back to Products
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={`/products/${product.id}/edit`}
              className="flex items-center gap-2"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Product details and inventory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Name
              </div>
              <div className="mt-1">{product.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Price
              </div>
              <div className="mt-1">${product.price.toFixed(2)}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Stock
              </div>
              <div className="mt-1">{product.stock}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Product ID
              </div>
              <div className="mt-1 font-mono text-sm">{product.id}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timestamps</CardTitle>
            <CardDescription>Creation and modification dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Created At
              </div>
              <div className="mt-1">
                {new Date(product.createdAt).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Updated At
              </div>
              <div className="mt-1">
                {new Date(product.updatedAt).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove its data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                deleteMutation.mutate(product.id);
                setShowDeleteDialog(false);
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return null;
  }

  return (
    <Layout>
      <ProductDetail id={id} />
    </Layout>
  );
}
