import { MeDocument } from "@/graphql-operations";
import type { MeQuery } from "@/graphql/graphql";
import { gqlClient } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export function useAuth() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        return await gqlClient.request<MeQuery>(MeDocument.toString());
      } catch {
        router.push("/");
      }
    },
    retry: false,
  });

  return {
    user: data?.me,
    isLoading,
  };
}
