import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Zap, MessageCircle, Shield, Users, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PricingPage = () => {
  const handleEnroll = () => {
    // Scroll to contact or redirect to payment
    window.open("https://wa.me/919876543210?text=I'm interested in the F&O Trading Course", "_blank");
  };

  const features = [
    "Complete F&O Trading Strategy",
    "Advanced Candlestick Patterns",
    "Doji Trading Techniques",
    "Live Market Practice Sessions",
    "Risk Management Strategies",
    "Technical Analysis Mastery",
    "Real Trade Examples & Case Studies",
    "Lifetime Access to Course Materials",
  ];

  const trustElements = [
    { icon: Users, label: "1000+ Students Trained", color: "text-accent" },
    { icon: TrendingUp, label: "Live Interactive Training", color: "text-success" },
    { icon: BookOpen, label: "Practical Strategy Focus", color: "text-primary" },
    { icon: Shield, label: "30-Day Money Back", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0 text-lg px-6 py-2">
              <Clock className="h-5 w-5 mr-2" />
              Limited Time Offer - Seats Filling Fast!
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Master Stock Market Trading
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Join India's Most Practical F&O and Candlestick Trading Program
            </p>
          </div>

          {/* Main Pricing Card */}
          <div className="max-w-5xl mx-auto mb-16">
            <Card className="border-2 border-accent shadow-2xl overflow-hidden">
              <div className="bg-gradient-accent p-1">
                <div className="bg-card">
                  <CardHeader className="text-center pb-8 pt-12">
                    <div className="flex justify-center mb-6">
                      <Badge className="bg-success text-success-foreground text-xl px-6 py-3 animate-pulse">
                        <Zap className="h-6 w-6 mr-2" />
                        Save ₹2,500 Today!
                      </Badge>
                    </div>
                    
                    {/* Price Display */}
                    <div className="mb-8">
                      <div className="flex items-center justify-center gap-6 mb-4">
                        <span className="text-3xl text-muted-foreground line-through">₹3,999</span>
                        <div className="text-center">
                          <div className="text-6xl md:text-7xl font-bold text-accent">₹1,499</div>
                          <p className="text-sm text-muted-foreground mt-2">+ GST (18%)</p>
                        </div>
                      </div>
                      <p className="text-2xl font-semibold text-success">
                        67% OFF - Final Price: ₹1,768
                      </p>
                    </div>

                    <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
                      Complete F&O Trading Course Kit
                    </CardTitle>
                    <CardDescription className="text-lg">
                      Everything you need to become a confident Indian stock market trader
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-8 px-8 pb-12">
                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                          <Check className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* What's Included */}
                    <div className="bg-gradient-hero p-8 rounded-lg text-primary-foreground">
                      <h3 className="text-2xl font-bold mb-6 text-center">What's Included in Your Kit</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Core Training:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>8 Live Zoom Webinars</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>All Session Recordings</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Candlestick Pattern E-Book</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Doji Strategy Workbook</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>F&O Trading Manual</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3 text-lg">Bonus Support:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Private Telegram Community</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Weekly Market Analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Trade Setup Alerts</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Risk Calculator Tool</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <span>Lifetime Content Updates</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-secondary p-6 rounded-lg">
                      <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Secure Payment Options
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        UPI • Credit/Debit Cards • Net Banking • PhonePe • GPay • Paytm
                      </p>
                      <p className="text-sm text-success font-semibold">
                        ✓ Instant access after payment • ✓ GST Invoice provided
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-4">
                      <Button 
                        onClick={handleEnroll}
                        size="lg" 
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-2xl font-bold py-8"
                      >
                        Enroll Now for ₹1,499 + GST
                      </Button>
                      <Button 
                        onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                        variant="outline"
                        size="lg" 
                        className="w-full border-2 border-success text-success hover:bg-success hover:text-success-foreground text-lg font-semibold py-6"
                      >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        WhatsApp Support - Get Help Now
                      </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                      30-day money-back guarantee • No questions asked refund policy
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>

          {/* Trust Elements */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 mb-16">
            {trustElements.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <item.icon className={`h-12 w-12 mx-auto mb-3 ${item.color}`} />
                  <p className="font-semibold text-foreground">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Instructor Preview */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">Learn from Akash Bhattacharjee</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Experienced trader with 10+ years in Indian stock markets. Specialized in F&O strategies and candlestick analysis.
            </p>
            <Link to="/#about">
              <Button variant="outline" size="lg">
                View Full Profile
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
