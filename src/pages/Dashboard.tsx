import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Bell, MessageCircle, Mail, LogOut, Lock, CheckCircle, Calendar, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const studentName = "Rahul Kumar"; // Placeholder
  const studentEmail = "rahul.kumar@example.com"; // Placeholder

  const webinars = [
    {
      title: "Advanced F&O Strategies",
      date: "Dec 20, 2024",
      time: "7:00 PM IST",
      status: "upcoming",
      zoomLink: "https://zoom.us/j/123456789"
    },
    {
      title: "Candlestick Pattern Deep Dive",
      date: "Dec 27, 2024",
      time: "7:00 PM IST",
      status: "upcoming",
      zoomLink: "https://zoom.us/j/987654321"
    },
  ];

  const studyModules = [
    { title: "Introduction to Stock Market", locked: false },
    { title: "Candlestick Patterns Basics", locked: false },
    { title: "Advanced Doji Strategies", locked: false },
    { title: "F&O Trading Fundamentals", locked: false },
    { title: "Risk Management", locked: true },
    { title: "Technical Indicators", locked: true },
    { title: "Real Trade Case Studies", locked: true },
  ];

  const announcements = [
    {
      title: "New Module Released: Risk Management",
      date: "2 days ago",
      message: "Access the new risk management module in your e-reader now!"
    },
    {
      title: "Weekly Market Analysis Available",
      date: "5 days ago",
      message: "Check the Telegram group for this week's market breakdown and trade setups."
    },
    {
      title: "Webinar Recording Posted",
      date: "1 week ago",
      message: "Recording of 'Advanced Candlestick Patterns' webinar is now available."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
              <div className="bg-accent p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-accent-foreground" />
              </div>
              <span>AB Institute</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <p className="font-semibold">{studentName}</p>
                <p className="text-sm opacity-90">{studentEmail}</p>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 animate-fade-in">
          <Card className="bg-gradient-accent border-0 text-accent-foreground">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {studentName}! 👋</h1>
                  <p className="text-lg opacity-90">Continue your journey to becoming a successful trader</p>
                </div>
                <Badge className="bg-primary text-primary-foreground text-lg px-6 py-3">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Enrolled
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Badge */}
        <div className="mb-8">
          <Card className="border-2 border-success">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="bg-success p-3 rounded-lg">
                  <Video className="h-8 w-8 text-success-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Live F&O Trading Program</h2>
                  <p className="text-muted-foreground">Complete Stock Market Course Kit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="webinars" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="webinars">
              <Video className="h-4 w-4 mr-2" />
              Webinars
            </TabsTrigger>
            <TabsTrigger value="materials">
              <BookOpen className="h-4 w-4 mr-2" />
              Study Materials
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <Bell className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
          </TabsList>

          {/* Webinars Tab */}
          <TabsContent value="webinars" className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-4">Upcoming Live Sessions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {webinars.map((webinar, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-primary">{webinar.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {webinar.date} at {webinar.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <Badge className="w-fit bg-success text-success-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Upcoming
                      </Badge>
                      <Link to="/webinar">
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Zoom Session
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 bg-secondary">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">
                  💡 <strong>Tip:</strong> All sessions are recorded. If you miss a live session, recordings will be available within 24 hours.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Materials Tab */}
          <TabsContent value="materials" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-primary">Course Modules</h3>
              <Link to="/e-reader">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Open E-Reader
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyModules.map((module, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-md transition-all ${module.locked ? 'opacity-60' : 'cursor-pointer'}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">{module.title}</h4>
                        <Badge variant={module.locked ? "outline" : "default"} className={module.locked ? "" : "bg-success"}>
                          {module.locked ? (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
                              Locked
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Available
                            </>
                          )}
                        </Badge>
                      </div>
                      <BookOpen className={`h-6 w-6 ${module.locked ? 'text-muted-foreground' : 'text-primary'}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-secondary">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  📚 New modules are unlocked progressively as you complete the course. Currently <strong>4 of 7</strong> modules available.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <h3 className="text-2xl font-bold text-primary mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg text-primary">{announcement.title}</CardTitle>
                        <CardDescription className="mt-1">{announcement.date}</CardDescription>
                      </div>
                      <Bell className="h-5 w-5 text-accent flex-shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground">{announcement.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Support Shortcuts */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-success hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <MessageCircle className="h-6 w-6" />
                WhatsApp Support
              </CardTitle>
              <CardDescription>Get instant help from our team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                className="w-full bg-success hover:bg-success/90 text-success-foreground"
              >
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Mail className="h-6 w-6" />
                Email Support
              </CardTitle>
              <CardDescription>Send us your queries anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.location.href = "mailto:support@abinstitute.com"}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
