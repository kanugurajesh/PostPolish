"use client"

import {
  ArrowRight,
  Sparkles,
  Clock,
  BarChart,
  MessageSquare,
  Shield,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Transform Your <span className="text-primary">LinkedIn</span> Content
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use AI-powered tools to create engaging, professional LinkedIn posts that
            capture attention and drive engagement.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/optimizer">
              <Button size="lg" className="gap-2">
                Try Post Optimizer <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Create Perfect Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                Smart suggestions to improve your content quality and engagement
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Real-time Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                Get instant feedback and optimization suggestions
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                Track engagement predictions and content performance
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Smart Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                User-friendly editor with tone and length controls
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy First
                </CardTitle>
              </CardHeader>
              <CardContent>
                Your content remains private and secure with advanced encryption
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Global Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                Support for multiple languages to reach a global audience
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enhance Your LinkedIn Presence?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who use PostPolish to create engaging content.
          </p>
          <Link href="/optimizer">
            <Button size="lg" className="gap-2">
              Start Optimizing <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
