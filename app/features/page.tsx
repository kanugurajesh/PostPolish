"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Globe, Sparkles, Clock, Share2, Shield } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Enhancement",
      description: "Transform your LinkedIn posts with advanced AI technology for more engaging and professional content.",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      badge: "Premium"
    },
    {
      title: "Real-time Processing",
      description: "Get instant results with our lightning-fast processing capabilities.",
      icon: <Clock className="h-6 w-6 text-green-500" />,
      badge: "Core"
    },
    {
      title: "Multi-language Support",
      description: "Polish your posts in multiple languages to reach a global audience.",
      icon: <Globe className="h-6 w-6 text-purple-500" />,
      badge: "Premium"
    },
    {
      title: "Easy Sharing",
      description: "Directly share your polished content to LinkedIn with one click.",
      icon: <Share2 className="h-6 w-6 text-orange-500" />,
      badge: "Coming Soon"
    },
    {
      title: "Privacy First",
      description: "Your content remains private and secure with our advanced encryption.",
      icon: <Shield className="h-6 w-6 text-red-500" />,
      badge: "Core"
    },
    {
      title: "Performance Boost",
      description: "Enhance your LinkedIn engagement with optimized content.",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      badge: "Premium"
    }
  ]

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Powerful Features</h1>
        <p className="text-xl text-muted-foreground">
          Discover what makes PostPolish the perfect tool for your LinkedIn content
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                {feature.icon}
                <Badge variant="secondary">{feature.badge}</Badge>
              </div>
              <CardTitle className="mt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
