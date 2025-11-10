import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Zap } from "lucide-react";

const Pricing = () => {
  const scrollToEnroll = () => {
    document.getElementById("enroll")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <Badge className="mb-4 bg-accent text-accent-foreground border-0">
            <Zap className="h-4 w-4 mr-1" />
            Limited Time Offer
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Special Launch Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get lifetime access to our comprehensive course at an unbeatable price
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-accent shadow-2xl overflow-hidden">
            <div className="bg-gradient-accent p-1">
              <div className="bg-card">
                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <Badge className="bg-success text-success-foreground text-lg px-4 py-2">
                      <Clock className="h-5 w-5 mr-2" />
                      Only 50 Seats Available This Month
                    </Badge>
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Complete Trading Course Kit
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Everything you need to start trading confidently in the Indian stock market
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className="text-2xl text-muted-foreground line-through">₹3,999</span>
                      <span className="text-5xl md:text-6xl font-bold text-accent">₹1499</span>
                    </div>
                    <p className="text-success font-semibold text-lg">
                      Save 63% - Limited Time Only!
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary mb-4 text-lg">Course Includes:</h4>
                      <ul className="space-y-3">
                        {[
                          "8 Live Zoom Webinars",
                          "All Session Recordings",
                          "Candlestick Pattern Guide",
                          "Doji Strategy Workbook",
                          "F&O Trading Manual",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-4 text-lg">Bonus Features:</h4>
                      <ul className="space-y-3">
                        {[
                          "Private Telegram Community",
                          "Weekly Market Analysis",
                          "Trade Setup Alerts",
                          "Risk Calculator Tool",
                          "Lifetime Access to Updates",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-secondary p-6 rounded-lg">
                    <h4 className="font-semibold text-primary mb-3">Payment Options:</h4>
                    <p className="text-muted-foreground">
                      We accept UPI, Credit/Debit Cards, Net Banking, and all major payment methods. 
                      Secure checkout with instant access after payment.
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 pb-8">
                  <Button 
                    onClick={scrollToEnroll}
                    size="lg" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-bold py-6"
                  >
                    Enroll Now for ₹1499
                  </Button>
                  <pre className="text-sm text-muted-foreground text-center">
                    30-day money-back guarantee if you're not satisfied.<br />
                    *Exclusive of GST
                  </pre>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
