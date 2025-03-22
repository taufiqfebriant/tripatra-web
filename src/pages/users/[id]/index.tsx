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
import { DeleteUserDocument, GetUserDocument } from "@/graphql-operations";
import type {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  GetUserQuery,
  GetUserQueryVariables,
} from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function UserDetail({ id }: { id: string }) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () =>
      gqlClient.request<GetUserQuery, GetUserQueryVariables>(
        GetUserDocument.toString(),
        { id }
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => {
      return gqlClient.request<DeleteUserMutation, DeleteUserMutationVariables>(
        DeleteUserDocument.toString(),
        { id: userId }
      );
    },
    onSuccess: () => {
      router.push("/users");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data?.user) {
    return <div>User not found</div>;
  }

  const { user } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Details</h1>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/users" className="flex items-center">
              Back to Users
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={`/users/${user.id}/edit`}
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
            <CardDescription>User&apos;s personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Name
              </div>
              <div className="mt-1">{user.name}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Email
              </div>
              <div className="mt-1">{user.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                User ID
              </div>
              <div className="mt-1 font-mono text-sm">{user.id}</div>
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
              user and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                deleteMutation.mutate(user.id);
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

export default function UserDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return null;
  }

  return (
    <Layout>
      <UserDetail id={id} />
    </Layout>
  );
}
