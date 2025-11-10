import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Shield, Users, BookOpen, Video } from "lucide-react";
import candlestickImage from "@/assets/candlestick-patterns.jpg";

const features = [
  {
    icon: BarChart3,
    title: "Candlestick Mastery",
    description: "Deep dive into Japanese candlestick patterns with real Indian stock market examples",
  },
  {
    icon: TrendingUp,
    title: "Doji Strategy",
    description: "Learn to identify and trade doji patterns for maximum profit potential",
  },
  {
    icon: Shield,
    title: "F&O Trading",
    description: "Understand Futures & Options with practical risk management techniques",
  },
  {
    icon: BookOpen,
    title: "Strategy Development",
    description: "Build your own trading strategies based on proven technical analysis",
  },
  {
    icon: Video,
    title: "Live Webinars",
    description: "Interactive Zoom sessions with live Q&A and real-time chart analysis",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join our active trading community for ongoing support and insights",
  },
];

const CourseFeatures = () => {
  return (
    <section id="course" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What You'll Learn
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive curriculum designed for the Indian stock market, from basics to advanced strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-primary">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl overflow-hidden shadow-xl">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Master Candlestick Patterns
              </h3>
              <div className="space-y-4 text-foreground">
                <div className="flex items-start gap-3">
                  <div className="bg-success rounded-full p-1 mt-1">
                    <svg className="h-4 w-4 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>20+ essential candlestick patterns explained with Indian market examples</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success rounded-full p-1 mt-1">
                    <svg className="h-4 w-4 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Live chart analysis sessions to practice pattern recognition</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success rounded-full p-1 mt-1">
                    <svg className="h-4 w-4 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Trade setup strategies with entry and exit signals</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-success rounded-full p-1 mt-1">
                    <svg className="h-4 w-4 text-success-foreground" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>Risk management and position sizing for each pattern</p>
                </div>
              </div>
            </div>
            <div className="h-full min-h-[400px]">
              <img src={candlestickImage} alt="Candlestick pattern examples" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseFeatures;
