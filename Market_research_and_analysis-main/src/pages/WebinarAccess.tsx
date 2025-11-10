import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Video, Calendar, Clock, ExternalLink, ArrowLeft, MessageCircle, Play, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WebinarAccess = () => {
  const [timeUntilNext, setTimeUntilNext] = useState({
    days: 5,
    hours: 14,
    minutes: 32,
  });

  const upcomingSessions = [
    {
      id: 1,
      title: "Advanced F&O Strategies",
      description: "Deep dive into futures and options trading with live market examples",
      date: "December 20, 2024",
      time: "7:00 PM - 9:00 PM IST",
      instructor: "Akash Bhattacharjee",
      zoomLink: "https://zoom.us/j/123456789",
      status: "next",
    },
    {
      id: 2,
      title: "Candlestick Pattern Deep Dive",
      description: "Master advanced candlestick patterns and reversal signals",
      date: "December 27, 2024",
      time: "7:00 PM - 9:00 PM IST",
      instructor: "Akash Bhattacharjee",
      zoomLink: "https://zoom.us/j/987654321",
      status: "upcoming",
    },
  ];

  const pastSessions = [
    {
      id: 1,
      title: "Introduction to Stock Market Trading",
      date: "December 6, 2024",
      duration: "2 hours",
      recordingLink: "#",
    },
    {
      id: 2,
      title: "Doji Trading Strategies",
      date: "December 13, 2024",
      duration: "2 hours",
      recordingLink: "#",
    },
  ];

  const faqs = [
    {
      question: "How do I join the live webinar?",
      answer: "Click the 'Join Zoom Session' button 5-10 minutes before the scheduled time. You'll be redirected to Zoom. Make sure you have Zoom installed or use the web version.",
    },
    {
      question: "What if I miss a live session?",
      answer: "Don't worry! All sessions are recorded and will be available in your dashboard within 24 hours. You can watch them anytime at your convenience.",
    },
    {
      question: "Do I need any special software?",
      answer: "You'll need Zoom (free version is fine). We recommend joining from a laptop or desktop for the best experience, but mobile phones work too.",
    },
    {
      question: "Can I ask questions during the webinar?",
      answer: "Absolutely! Use the Q&A feature in Zoom or raise your hand. We encourage interaction and answer questions throughout the session.",
    },
    {
      question: "What time zone are the sessions in?",
      answer: "All webinar times are in Indian Standard Time (IST). If you're in a different time zone, please adjust accordingly.",
    },
    {
      question: "Technical issues during webinar?",
      answer: "If you face technical issues, contact us immediately on WhatsApp support. We'll help you troubleshoot or provide alternative access.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Live Webinar Sessions</h1>
              <p className="text-primary-foreground/80 mt-1">Join interactive training with Akash Bhattacharjee</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Countdown Timer */}
        <Card className="mb-8 border-2 border-accent bg-gradient-accent text-accent-foreground">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-lg mb-4 font-semibold">Next Live Session Starts In:</p>
              <div className="flex justify-center gap-8 mb-4">
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeUntilNext.days}</div>
                  <div className="text-sm opacity-90">Days</div>
                </div>
                <div className="text-5xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeUntilNext.hours}</div>
                  <div className="text-sm opacity-90">Hours</div>
                </div>
                <div className="text-5xl font-bold">:</div>
                <div className="text-center">
                  <div className="text-5xl font-bold">{timeUntilNext.minutes}</div>
                  <div className="text-sm opacity-90">Minutes</div>
                </div>
              </div>
              <p className="text-sm opacity-90">Advanced F&O Strategies - December 20, 2024</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Upcoming Sessions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className={`hover:shadow-lg transition-all ${session.status === 'next' ? 'border-2 border-accent' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {session.status === 'next' && (
                          <Badge className="bg-accent text-accent-foreground animate-pulse">
                            Next Session
                          </Badge>
                        )}
                        <Badge variant="outline">
                          <Video className="h-3 w-3 mr-1" />
                          Live
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-primary">{session.title}</CardTitle>
                      <CardDescription className="mt-2">{session.description}</CardDescription>
                    </div>
                    <Video className="h-8 w-8 text-accent flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="text-muted-foreground">Instructor:</span>
                        <span className="font-semibold">{session.instructor}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => window.open(session.zoomLink, "_blank")}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="lg"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Join Zoom Session
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      💡 Join 5-10 minutes early to test your audio and video
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Sessions / Recordings */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Past Session Recordings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary flex items-start gap-2">
                    <Play className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{session.title}</span>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{session.duration}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => window.open(session.recordingLink, "_blank")}
                    variant="outline" 
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Recording
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-secondary">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">
                  All webinar recordings are available for lifetime access. New recordings are uploaded within 24 hours of the live session.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-primary font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Support Section */}
        <section>
          <Card className="border-2 border-success">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Need Help?</CardTitle>
              <CardDescription>Our support team is here to assist you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                  className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  size="lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  WhatsApp Support
                </Button>
                <Button 
                  onClick={() => window.location.href = "mailto:support@abinstitute.com"}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Email Support
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Response time: Within 2 hours during business hours (9 AM - 9 PM IST)
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default WebinarAccess;
