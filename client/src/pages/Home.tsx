import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Users, BookOpen, Mountain, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { branding } from "@/config/branding";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-5xl md:text-6xl font-bold">{branding.organization.name}</h2>
            <p className="text-2xl text-muted-foreground">{branding.organization.subtitle}</p>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {branding.organization.tagline}
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
            {branding.features.map((feature) => {
              const iconMap: { [key: string]: any } = {
                Users,
                Mountain,
                BookOpen,
              };
              const IconComponent = iconMap[feature.icon];
              
              return (
                <Card key={feature.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
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
          <p>{branding.footer.copyright}</p>
          <p className="mt-2">{branding.footer.tagline}</p>
        </div>
      </footer>
    </div>
  );
}
