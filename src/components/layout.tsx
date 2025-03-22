import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn, setGraphQLAuthorization } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setGraphQLAuthorization(null);
    router.push("/");
    await queryClient.invalidateQueries();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-[60rem] mx-auto py-10">
      <nav className="flex justify-between items-center">
        <ul className="flex gap-4">
          <li>
            <Link
              href="/home"
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                router.pathname === "/home"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/users"
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                router.pathname.startsWith("/users")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                router.pathname.startsWith("/products")
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              Products
            </Link>
          </li>
        </ul>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </nav>

      <main className="mt-5">{children}</main>
    </div>
  );
}
