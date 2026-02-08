import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Mountain, Users, BookOpen, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/20 via-accent/10 to-primary/10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Baltistan Comsian Abbottabad</h1>
          <p className="text-xl text-muted-foreground">
            Connecting students from the beautiful Gilgit-Baltistan region at COMSATS University Abbottabad
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
        {/* About Baltistan */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">About Baltistan</h2>
          </div>
          <Card className="p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Baltistan, also known as the Gilgit-Baltistan region, is a breathtakingly beautiful territory in the northern part of the Indian subcontinent. Nestled in the heart of the Karakoram and Hindu Kush mountain ranges, Baltistan is home to some of the world's highest peaks, including K2, the second-highest mountain on Earth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The region is characterized by its stunning natural landscapes, including pristine glaciers, crystal-clear lakes, and verdant valleys. Major cities like Skardu, the capital of Gilgit-Baltistan, serve as gateways to adventure and exploration. The region's rich cultural heritage, influenced by Tibetan, Central Asian, and South Asian traditions, makes it a unique and vibrant destination.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a population of approximately 1.4 million people, Baltistan is home to diverse ethnic groups including Balti, Drokpa, Shin, and others. The people of Baltistan are known for their warmth, hospitality, and strong sense of community.
            </p>
          </Card>
        </section>

        {/* Cultural Heritage */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Cultural Heritage</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-3">Language & Traditions</h3>
              <p className="text-muted-foreground">
                The Balti language is the primary language spoken in the region, reflecting the unique cultural identity of the Balti people. Traditional crafts, music, and festivals play an integral role in preserving the region's rich heritage.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-3">Historical Significance</h3>
              <p className="text-muted-foreground">
                Baltistan has been a crossroads of civilizations for centuries, with influences from the Silk Road trade routes. Ancient monasteries and forts stand as testament to the region's historical importance and cultural depth.
              </p>
            </Card>
          </div>
        </section>

        {/* About COMSATS */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">COMSATS University Abbottabad</h2>
          </div>
          <Card className="p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              COMSATS University Abbottabad is one of Pakistan's leading institutions of higher education, committed to excellence in teaching, research, and community engagement. Located in the scenic city of Abbottabad, the university serves students from across Pakistan and beyond.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The university offers a wide range of undergraduate and postgraduate programs across multiple disciplines including Engineering, Computer Science, Business Administration, Natural Sciences, and more. With a dedicated faculty and state-of-the-art facilities, COMSATS provides an environment conducive to academic excellence and personal growth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              COMSATS is proud to host students from the Gilgit-Baltistan region, fostering a diverse and inclusive academic community that celebrates cultural diversity and promotes cross-cultural understanding.
            </p>
          </Card>
        </section>

        {/* About Baltistan Comsian */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">Baltistan Comsian Community</h2>
          </div>
          <Card className="p-6 space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The Baltistan Comsian community represents a vibrant group of students from the Gilgit-Baltistan region studying at COMSATS University Abbottabad. This community serves as a bridge between the beautiful mountains of Baltistan and the academic excellence of COMSATS.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Foster unity and camaraderie among students from Baltistan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Celebrate and preserve the cultural heritage of the Baltistan region</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Support academic excellence and professional development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Create networking opportunities for career advancement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Contribute to the development of the Baltistan region through education and innovation</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Through this platform, we celebrate our shared heritage, support one another in our academic journeys, and work together to make a positive impact in our communities and beyond.
            </p>
          </Card>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <Card className="p-6">
            <p className="text-muted-foreground mb-4">
              Have questions or want to join the Baltistan Comsian community? We'd love to hear from you!
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <span className="font-semibold">Email:</span> baltistan.comsian@comsats.edu.pk
              </p>
              <p>
                <span className="font-semibold">Location:</span> COMSATS University Abbottabad, Pakistan
              </p>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
