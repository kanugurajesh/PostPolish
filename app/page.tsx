"use client"

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  MessageSquare,
  Save,
  Clock,
  BarChart,
  Eye,
  Sparkles,
  Settings,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Footer } from "@/components/Footer";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

const LinkedInPostOptimizer = () => {
  const [post, setPost] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [drafts, setDrafts] = useState<
    { id: number; content: string; date: string }[]
  >([]);
  const [analytics, setAnalytics] = useState({
    estimatedReach: 0,
    engagement: 0,
    optimal: false,
    bestPostingTime: "",
    hashtagSuggestions: [] as string[],
    contentScore: 0,
  });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tone, setTone] = useState<'professional' | 'casual' | 'storytelling'>('professional');
  const [postLength, setPostLength] = useState<'short' | 'medium' | 'long'>('medium');

  // Load drafts from localStorage on component mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem("linkedinDrafts");
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  const analyzePost = (text: string) => {
    const suggestions: string[] = [];

    // Enhanced post analysis
    if (text.length < 100) {
      suggestions.push(
        "Consider making your post longer (ideal length: 100-250 characters)"
      );
    }
    if (text.length > 1300) {
      suggestions.push(
        "Post is too long. LinkedIn truncates posts after ~1300 characters"
      );
    }

    const hashtags = text.match(/#\w+/g) || [];
    if (hashtags.length === 0) {
      suggestions.push("Add relevant hashtags (3-5 recommended)");
    } else if (hashtags.length > 7) {
      suggestions.push(
        "Too many hashtags might look spammy. Keep it between 3-5"
      );
    }

    if (!text.includes("?")) {
      suggestions.push("Consider adding a question to boost engagement");
    }

    if (!text.includes("\n")) {
      suggestions.push("Add line breaks to improve readability");
    }

    if (!text.includes("@")) {
      suggestions.push("Consider mentioning relevant connections using @");
    }

    if (text.includes("http")) {
      suggestions.push(
        "Consider putting links in the first comment instead of the post"
      );
    }

    // Calculate estimated analytics
    const estimatedReach = Math.floor(
      text.length * 2 +
        hashtags.length * 100 +
        text.split("\n").length * 50 +
        (text.match(/@\w+/g) || []).length * 75
    );

    const engagement = Math.min(
      ((text.includes("?") ? 15 : 0) +
        hashtags.length * 5 +
        text.split("\n").length * 3) /
        100,
      0.3
    );

    setAnalytics({
      estimatedReach,
      engagement: Number((engagement * 100).toFixed(1)),
      optimal: suggestions.length <= 2,
      bestPostingTime: analytics.bestPostingTime,
      hashtagSuggestions: analytics.hashtagSuggestions,
      contentScore: analytics.contentScore
    });

    // Generate AI suggestions
    const aiTips = generateAiSuggestions(text);
    setAiSuggestions(aiTips);

    return suggestions;
  };

  const generateAiSuggestions = (text: string) => {
    // Simulate AI-powered content suggestions
    const tips: string[] = [];

    if (text.length > 50) {
      const words = text.toLowerCase().split(" ");

      // Check for engagement triggers
      if (
        !words.some((w) => ["share", "tell", "what", "how", "why"].includes(w))
      ) {
        tips.push(
          'Try adding engagement triggers like "Share your thoughts" or "What do you think?"'
        );
      }

      // Check for storytelling elements
      if (
        !words.some((w) =>
          ["when", "while", "after", "before", "during"].includes(w)
        )
      ) {
        tips.push("Consider adding a brief story or personal experience");
      }

      // Check for action words
      if (
        !words.some((w) =>
          ["discover", "learn", "boost", "improve", "create"].includes(w)
        )
      ) {
        tips.push("Include action-oriented words to drive engagement");
      }
    }

    return tips.join("\n");
  };

  const optimizeWithAI = async (text: string) => {
    setIsOptimizing(true);
    setError(null);
    try {
      const prompt = `As a LinkedIn content expert, analyze and optimize the following post. Format the response in markdown. Include:

1. An optimized version of the post that matches the tone (${tone}) and length (${postLength})
2. ### Content Analysis
   - Strengths
   - Areas for improvement
   - Content score (0-100)
3. ### Engagement Optimization
   - Best posting time
   - Recommended hashtags (3-5)
   - Target audience
4. ### SEO and Visibility Tips
   - Keyword optimization
   - Platform-specific tips
5. ### Additional Suggestions
   - Call-to-action recommendations
   - Visual content suggestions
   - Engagement prompts

Original post:
${text}`;

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Failed to optimize post');
      
      const data = await response.json();
      const aiResponse = data.response;

      // Parse AI response
      const suggestions = aiResponse
        .split('\n')
        .filter((line: string) => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map((suggestion: string) => suggestion.replace(/^[-•]\s*/, ''));
      
      // Update AI suggestions with the extracted suggestions
      setAiSuggestions(suggestions.join('\n'));
      
      // Extract hashtags from the response
      const hashtagMatch = aiResponse.match(/#[a-zA-Z0-9]+/g) || [];
      
      // Update analytics with more detailed information
      setAnalytics({
        estimatedReach: Math.floor(Math.random() * 5000) + 1000,
        engagement: Math.floor(Math.random() * 100),
        optimal: true,
        bestPostingTime: extractPostingTime(aiResponse) || "9:00 AM EST",
        hashtagSuggestions: hashtagMatch.slice(0, 5),
        contentScore: extractContentScore(aiResponse) || 85,
      });

    } catch (err) {
      setError('Failed to optimize post. Please try again.');
      console.error('Error optimizing post:', err);
    } finally {
      setIsOptimizing(false);
    }
  };

  // Helper functions for extracting information from AI response
  const extractPostingTime = (response: string): string | null => {
    const timeMatch = response.match(/best posting time:?\s*([^\\n]+)/i);
    if (!timeMatch) return null;
    // Remove markdown formatting (asterisks)
    return timeMatch[1].trim().replace(/\*/g, '');
  };

  const extractContentScore = (response: string): number | null => {
    const scoreMatch = response.match(/content score:?\s*(\d+)/i);
    return scoreMatch ? parseInt(scoreMatch[1]) : null;
  };

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPost = e.target.value;
    setPost(newPost);
    analyzePost(newPost);
  };

  const handleAnalyze = () => {
    if (!post.trim()) return;
    optimizeWithAI(post);
    analyzePost(post);
  };

  const saveDraft = () => {
    const newDraft = {
      id: Date.now(),
      content: post,
      date: new Date().toISOString(),
    };
    const updatedDrafts = [...drafts, newDraft];
    setDrafts(updatedDrafts);
    localStorage.setItem("linkedinDrafts", JSON.stringify(updatedDrafts));
  };

  const loadDraft = (draft: { id: number; content: string; date: string }) => {
    setPost(draft.content);
    analyzePost(draft.content);
  };

  const deleteDraft = (id: number) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem("linkedinDrafts", JSON.stringify(updatedDrafts));
  };

  const getPostStats = () => {
    const words = post.trim().split(/\s+/).length;
    const chars = post.length;
    const hashtags = (post.match(/#\w+/g) || []).length;
    const mentions = (post.match(/@\w+/g) || []).length;
    const lines = post.split("\n").length;

    return { words, chars, hashtags, mentions, lines };
  };

  const currentStats = getPostStats();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                Create Your Post
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-32 p-2 rounded-md bg-background border text-foreground"
                placeholder="Write your LinkedIn post here..."
                value={post}
                onChange={handlePostChange}
              />
              <div className="flex gap-2 mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={handleAnalyze}
                >
                  <Sparkles className="h-4 w-4" />
                  {isOptimizing ? 'Optimizing...' : 'Optimize with AI'}
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
                  onClick={saveDraft}
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </button>
              </div>
              <div className="text-sm text-muted-foreground mt-2 flex gap-4">
                <span>{currentStats.words} words</span>
                <span>{currentStats.chars} characters</span>
                <span>{currentStats.hashtags} hashtags</span>
                <span>{currentStats.mentions} mentions</span>
              </div>
            </CardContent>
          </Card>

          {/* AI Status and Suggestions */}
          {isOptimizing && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                Optimizing your post with AI...
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {aiSuggestions && (
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  AI-Powered Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-blue max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
                    className="markdown-content"
                  >
                    {aiSuggestions}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Right Column - Analytics and Drafts */}
          <div className="space-y-4">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  Post Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Tone</label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value as 'professional' | 'casual' | 'storytelling')}
                      className="w-full p-2 rounded-md bg-background border text-foreground"
                    >
                      <option value="professional">Professional</option>
                      <option value="casual">Casual</option>
                      <option value="storytelling">Storytelling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Length</label>
                    <select
                      value={postLength}
                      onChange={(e) => setPostLength(e.target.value as 'short' | 'medium' | 'long')}
                      className="w-full p-2 rounded-md bg-background border text-foreground"
                    >
                      <option value="short">Short (&lt;100 words)</option>
                      <option value="medium">Medium (100-200 words)</option>
                      <option value="long">Long (&gt;200 words)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-violet-500" />
                  Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Reach</span>
                    <span className="font-medium">{analytics.estimatedReach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement Score</span>
                    <span className="font-medium">{analytics.engagement}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Content Score</span>
                    <span className="font-medium text-blue-500">{analytics.contentScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Posting Time</span>
                    <span className="font-medium">{analytics.bestPostingTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-2">Recommended Hashtags</span>
                    <div className="flex flex-wrap gap-2">
                      {analytics.hashtagSuggestions.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-primary flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Saved Drafts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {drafts.map((draft, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-secondary">
                      <span className="text-sm text-secondary-foreground">{draft.date}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadDraft(draft)}
                          className="p-1 hover:text-blue-500"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteDraft(draft.id)}
                          className="p-1 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {aiSuggestions && (
          <Card className="bg-card text-card-foreground mt-4">
            <CardContent className="prose prose-blue max-w-none p-4">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                remarkPlugins={[remarkGfm]}
              >
                {aiSuggestions}
              </ReactMarkdown>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LinkedInPostOptimizer;
