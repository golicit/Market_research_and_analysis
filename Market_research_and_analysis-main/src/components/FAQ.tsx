import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need prior experience in stock trading?",
    answer: "No prior experience is required! This course is designed for beginners to intermediate traders. We start with the basics and gradually progress to advanced strategies. Even if you've never opened a demat account, we'll guide you through everything.",
  },
  {
    question: "What if I miss a live Zoom session?",
    answer: "Don't worry! All live sessions are recorded and made available within 24 hours. You get lifetime access to all recordings, so you can learn at your own pace. Plus, you can ask questions in our Telegram community anytime.",
  },
  {
    question: "Are the recordings available forever?",
    answer: "Yes! Once you enroll, you get lifetime access to all course materials, recordings, and future updates. As we add new content or update strategies, you'll automatically get access at no additional cost.",
  },
  {
    question: "Is this investment advice or a trading course?",
    answer: "This is purely an educational course focused on teaching technical analysis and trading strategies. We do not provide investment advice or stock recommendations. You'll learn how to analyze markets and make your own informed trading decisions.",
  },
  {
    question: "What is the refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with the course quality within the first 30 days, simply email us for a full refund. No questions asked.",
  },
  {
    question: "How long will it take to become profitable?",
    answer: "Trading profitability depends on many factors including your learning pace, practice time, and market conditions. Most students start seeing improvements in their trading decisions within 2-3 months of consistent learning and practice. However, we recommend starting with paper trading or small positions initially.",
  },
  {
    question: "Do I need special software or expensive tools?",
    answer: "No expensive tools required! You just need a trading account with any broker (like Zerodha, Upstox, etc.) and their free charting tools. We teach you how to use commonly available platforms. A laptop or smartphone with internet connection is all you need.",
  },
  {
    question: "What about the risk disclaimer?",
    answer: "Stock market trading involves significant risk and is not suitable for everyone. Past performance does not guarantee future results. This course is for educational purposes only. You should only invest money that you can afford to lose. We recommend consulting with a financial advisor before making investment decisions.",
  },
  {
    question: "How do I join the Telegram community?",
    answer: "After enrollment, you'll receive an email with your course access details and Telegram group link. The community is active 24/7 with students sharing insights, asking questions, and supporting each other. Akash also participates regularly with market updates.",
  },
  {
    question: "Can I get one-on-one mentorship?",
    answer: "While the course includes live Q&A sessions and community support, one-on-one mentorship is available as a separate premium service. Many students find the group sessions and community support sufficient. Contact us after enrollment if you're interested in personalized mentorship.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the course
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:text-accent">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center bg-secondary p-8 rounded-lg max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-primary mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Feel free to reach out to us via the contact form below or email us directly
          </p>
          <p className="text-accent font-semibold">
            Email: info@abinstitute.com | Phone: +91 98765 43210
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
