import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit2, Award } from "lucide-react"

export function ProfileSection() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Profile</CardTitle>
        <Button variant="ghost" size="icon">
          <Edit2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20 border-2 border-accent">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=trading" />
              <AvatarFallback>TR</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="font-semibold text-foreground">Alexandra Morgan</h3>
              <p className="text-sm text-muted-foreground">Premium Member</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Joined</span>
              <span className="text-sm font-medium text-foreground">Jan 15, 2024</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Courses</span>
              <span className="text-sm font-medium text-foreground">8 Active</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Progress</span>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: "68%" }} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Certificates</span>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">3</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
