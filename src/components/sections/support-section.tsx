import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react"

export function SupportSection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-accent" />
          <CardTitle>Support & Help</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* WhatsApp Support */}
          <Button className="w-full justify-start gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white" size="lg" asChild>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </Button>

          {/* SMS Support */}
          <Button className="w-full justify-start gap-3 bg-blue-600 hover:bg-blue-700 text-white" size="lg" asChild>
            <a href="sms:+1234567890">
              <Phone className="w-5 h-5" />
              <span>Send SMS</span>
            </a>
          </Button>

          {/* Email Support */}
          <Button
            className="w-full justify-start gap-3 bg-secondary hover:bg-secondary/90 text-white"
            size="lg"
            asChild
          >
            <a href="mailto:support@tradehub.com">
              <Mail className="w-5 h-5" />
              <span>Email Support</span>
            </a>
          </Button>

          {/* FAQ */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-border text-foreground hover:bg-background bg-transparent"
            size="lg"
          >
            <HelpCircle className="w-5 h-5" />
            <span>FAQ & Documentation</span>
          </Button>

          {/* Support Info */}
          <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <p className="text-xs text-muted-foreground mb-2">
              <span className="font-semibold text-accent">Response Times:</span>
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• WhatsApp: 15 min average</li>
              <li>• Email: 2 hours average</li>
              <li>• SMS: 30 min average</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
