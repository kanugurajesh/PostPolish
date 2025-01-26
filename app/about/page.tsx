"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, Twitter } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About PostPolish</h1>
          <p className="text-xl text-muted-foreground">
            Empowering professionals to create impactful LinkedIn content
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              PostPolish was created with a simple yet powerful mission: to help professionals
              enhance their LinkedIn presence through polished, engaging content. We believe that
              everyone deserves to present their best professional self online, and our AI-powered
              platform makes that possible.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Why PostPolish?</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Advanced AI technology for content enhancement</li>
              <li>User-friendly interface for seamless experience</li>
              <li>Privacy-focused approach to content handling</li>
              <li>Regular updates and new features</li>
              <li>Dedicated support for our users</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/kanugurajesh/PostPolish" 
                target="_blank"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>
              <Link 
                href="https://twitter.com/rajesh" 
                target="_blank"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
