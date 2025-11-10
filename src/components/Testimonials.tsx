import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "I was a complete beginner when I joined. Akash's teaching style is so clear and practical. Within 3 months, I'm confidently trading with small positions and seeing positive results!",
    achievement: "From beginner to profitable trader",
  },
  {
    name: "Priya Sharma",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "The candlestick pattern module is outstanding! I now understand how to read market sentiment through charts. The live sessions with real-time analysis are incredibly valuable.",
    achievement: "Mastered technical analysis",
  },
  {
    name: "Amit Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "Best investment I made was in this course. The F&O strategies are well-explained with risk management. Made back the course fee in my first successful trade!",
    achievement: "Recovered course fee in first month",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    text: "As a working professional, the recorded sessions helped me learn at my own pace. The Telegram community is super active and supportive. Highly recommended!",
    achievement: "Learning while working full-time",
  },
  {
    name: "Vikram Singh",
    location: "Delhi, NCR",
    rating: 5,
    text: "I attended many courses before, but Akash's practical approach stands out. He shares his actual trades and explains the thought process. Real learning happens here.",
    achievement: "Finally found practical training",
  },
  {
    name: "Anita Desai",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "The course structure is perfect - starts with basics and gradually builds complexity. The doji strategy module helped me avoid several losing trades. Worth every rupee!",
    achievement: "Improved win rate significantly",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Success Stories from Our Students
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real people who transformed their trading journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="h-8 w-8 text-accent opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                
                <p className="text-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="border-t border-border pt-4 mt-4">
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial.location}</p>
                  <div className="bg-success/10 text-success px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    {testimonial.achievement}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-card p-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <p className="text-4xl font-bold text-accent mb-1">4.8/5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block"></div>
              <div className="text-center">
                <p className="text-4xl font-bold text-success mb-1">5000+</p>
                <p className="text-sm text-muted-foreground">Students Trained</p>
              </div>
              <div className="h-12 w-px bg-border hidden sm:block"></div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary mb-1">92%</p>
                <p className="text-sm text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
