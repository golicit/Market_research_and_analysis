import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button"


export default function Logindash() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-background to-background flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-accent">AB Institue</h1>
          <p className="text-xl text-muted-foreground">Market Research and Analysis</p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/loginform">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
              Login
            </Button>
          </Link>
          <Link to="/registerform">
            <Button size="lg" className="border-2 border-accent text-accent hover:bg-accent/10 font-semibold">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl text-accent mb-2">📈</div>
            <h3 className="font-semibold mb-2">Learn Trading</h3>
            <p className="text-sm text-muted-foreground">Expert-led courses for all skill levels</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl text-accent mb-2">🎯</div>
            <h3 className="font-semibold mb-2">Live Markets</h3>
            <p className="text-sm text-muted-foreground">Real-time market analysis and insights</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <div className="text-3xl text-accent mb-2">📊</div>
            <h3 className="font-semibold mb-2">Track Progress</h3>
            <p className="text-sm text-muted-foreground">Monitor your learning journey</p>
          </div>
        </div>
      </div>
    </main>
  )
}
