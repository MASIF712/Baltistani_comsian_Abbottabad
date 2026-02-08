import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { branding } from "@/config/branding";
import { getLoginUrl } from "@/const";
import { Mountain } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mountain className="w-6 h-6 text-primary" />
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none">{branding.organization.name}</span>
                <span className="text-xs text-muted-foreground">{branding.organization.subtitle}</span>
              </div>
            </a>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {Object.entries(branding.navigation).map(([key, item]) => (
              <Link key={key} href={item.path}>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Login</a>
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.name}
                </span>
                {user?.role === "admin" && (
                  <Link href="/admin">
                    <a className="px-3 py-2 rounded-md text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      Admin
                    </a>
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={logout}
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
