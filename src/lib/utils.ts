import { clsx, type ClassValue } from "clsx";
import { GraphQLClient } from "graphql-request";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1323/graphql",
  {
    credentials: "include",
  }
);

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    setGraphQLAuthorization(token);
  }
}

export function setGraphQLAuthorization(token: string | null) {
  if (token) {
    gqlClient.setHeader("Authorization", `Bearer ${token}`);
  } else {
    gqlClient.setHeaders({});
  }
}

export { gqlClient };
