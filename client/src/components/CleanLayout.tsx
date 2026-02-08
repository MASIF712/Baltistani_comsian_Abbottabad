import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";

export default function CleanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, user } = useAuth();

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col items-center gap-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to continue
            </h1>
            <p className="text-sm text-muted-foreground">
              Access to this dashboard requires authentication. Continue to launch the login flow.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      {children}
    </main>
  );
}
