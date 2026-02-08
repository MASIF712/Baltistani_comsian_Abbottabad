import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Users, BookOpen, Mountain, ArrowRight } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Baltistan Comsian</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/directory">
              <a className="text-muted-foreground hover:text-foreground transition-colors">Directory</a>
            </Link>
            <Link href="/about">
              <a className="text-muted-foreground hover:text-foreground transition-colors">About</a>
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/admin">
                <a className="text-muted-foreground hover:text-foreground transition-colors">Admin</a>
              </Link>
            )}
            {!isAuthenticated ? (
              <Button size="sm" asChild>
                <a href={getLoginUrl()}>Login</a>
              </Button>
            ) : (
              <div className="text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span className="font-semibold">{user?.name}</span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-bold">Baltistan Comsian</h2>
            <p className="text-2xl text-muted-foreground">Abbottabad Community</p>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connecting students from the majestic Gilgit-Baltistan region at COMSATS University Abbottabad. 
            Celebrating culture, fostering excellence, and building lasting connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/directory">
              <a>
                <Button size="lg" className="flex items-center gap-2">
                  Explore Members <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </Link>
            <Link href="/about">
              <a>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Community</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-bold">Connect</h3>
              </div>
              <p className="text-muted-foreground">
                Meet and connect with fellow students from Baltistan studying at COMSATS University Abbottabad.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Mountain className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-bold">Celebrate Culture</h3>
              </div>
              <p className="text-muted-foreground">
                Celebrate the rich heritage and traditions of the Baltistan region and Balti people.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-bold">Grow Together</h3>
              </div>
              <p className="text-muted-foreground">
                Support academic excellence and professional development within our community.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground">
            Browse our member directory to connect with students from your region.
          </p>
          <Link href="/directory">
            <a>
              <Button size="lg" className="flex items-center gap-2">
                View Member Directory <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; 2026 Baltistan Comsian Abbottabad. All rights reserved.</p>
          <p className="mt-2">Celebrating the spirit of Baltistan at COMSATS University Abbottabad</p>
        </div>
      </footer>
    </div>
  );
}
