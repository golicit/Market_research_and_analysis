import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, GraduationCap, Users } from "lucide-react";
import trainerImage from "@/assets/trainer-akash.jpg";

const About = () => {
  const achievements = [
    { icon: Briefcase, label: "10+ Years Trading Experience", color: "text-accent" },
    { icon: Users, label: "5000+ Students Trained", color: "text-success" },
    { icon: GraduationCap, label: "Certified Market Analyst", color: "text-primary" },
    { icon: Award, label: "Featured in Business Today", color: "text-accent" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Meet Your Trainer
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from a practitioner who trades daily in the Indian markets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <img 
              src={trainerImage} 
              alt="Akash Bhattacharjee - Stock Market Trainer" 
              className="rounded-2xl shadow-2xl w-full"
            />
          </div>

          <div className="space-y-6 animate-slide-in-right">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">
                Akash Bhattacharjee
              </h3>
              <p className="text-xl text-accent font-semibold mb-4">
                Market Research Specialist & Trading Mentor
              </p>
            </div>

            <div className="prose prose-lg">
              <p className="text-foreground leading-relaxed">
                With over a decade of experience in the Indian stock market, Akash has helped 
                thousands of individuals transform from beginners to confident traders. His 
                practical, strategy-driven approach focuses on real-world applications rather 
                than just theory.
              </p>
              <p className="text-foreground leading-relaxed">
                Specializing in candlestick patterns, doji strategies, and F&O trading, Akash 
                brings hands-on trading experience to every session. He actively trades in NSE 
                and BSE, providing students with current market insights and proven strategies.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {achievements.map((item, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <item.icon className={`h-8 w-8 mb-2 ${item.color}`} />
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-secondary p-6 rounded-lg">
              <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Badge className="bg-accent text-accent-foreground">Why Learn From Me?</Badge>
              </h4>
              <ul className="space-y-2 text-foreground">
                <li>• Active trader with real money in the markets</li>
                <li>• Focus on Indian stock market specifics (NSE/BSE)</li>
                <li>• Simplified strategies that actually work</li>
                <li>• Ongoing mentorship and community support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
