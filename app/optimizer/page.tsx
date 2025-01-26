"use client"

import React, { useState, useEffect, ChangeEvent } from "react";
import {
  AlertCircle,
  MessageSquare,
  Save,
  BarChart,
  Eye,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type ToneType = 'professional' | 'casual' | 'storytelling';
type LengthType = 'short' | 'medium' | 'long';

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
  const [tone, setTone] = useState<ToneType>('professional');
  const [postLength, setPostLength] = useState<LengthType>('medium');

  // Load drafts from localStorage on component mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem("linkedinDrafts");
    if (savedDrafts) {
      setDrafts(JSON.parse(savedDrafts));
    }
  }, []);

  const handlePostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
    analyzePost(e.target.value);
  };

  const analyzePost = (text: string) => {
    // Reset error state
    setError(null);

    // Basic post analysis
    const hashtags = text.match(/#\w+/g) || [];
    const mentions = text.match(/@\w+/g) || [];
    const lines = text.split('\n').length;
    const words = text.trim().split(/\s+/).length;

    // Generate analytics
    setAnalytics({
      estimatedReach: Math.floor(
        words * 2 +
        hashtags.length * 100 +
        lines * 50 +
        mentions.length * 75
      ),
      engagement: Math.min(
        ((text.includes("?") ? 15 : 0) +
          hashtags.length * 5 +
          lines * 3) / 100,
        0.3
      ) * 100,
      optimal: hashtags.length >= 2 && hashtags.length <= 5,
      bestPostingTime: "9:00 AM EST",
      hashtagSuggestions: ["linkedin", "career", "networking", "growth"],
      contentScore: Math.min(
        Math.floor(
          (words >= 50 ? 30 : 15) +
          (hashtags.length >= 2 ? 20 : 10) +
          (lines >= 3 ? 20 : 10) +
          (text.includes("?") ? 15 : 0) +
          (mentions.length > 0 ? 15 : 0)
        ),
        100
      ),
    });

    // Generate AI suggestions
    const suggestions = [];

    if (words < 50) {
      suggestions.push("Consider making your post longer for better engagement (aim for 50-100 words)");
    }
    if (hashtags.length === 0) {
      suggestions.push("Add relevant hashtags (2-5 recommended) to increase visibility");
    }
    if (!text.includes("?")) {
      suggestions.push("Including a question can boost engagement by encouraging responses");
    }
    if (lines < 3) {
      suggestions.push("Break your content into multiple lines for better readability");
    }
    if (mentions.length === 0) {
      suggestions.push("Consider mentioning relevant connections to expand reach");
    }

    setAiSuggestions(suggestions.join("\n\n"));
  };

  const handleOptimize = async () => {
    if (!post.trim()) {
      setError("Please write something before optimizing");
      return;
    }

    setIsOptimizing(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate optimized suggestions based on tone and length
      const suggestions = [];
      
      // Add tone-specific suggestions
      if (tone === 'professional') {
        suggestions.push(
          "### Professional Tone Optimization",
          "Your post has been optimized for a professional audience:\n",
          "- Use industry-specific terminology",
          "- Maintain a formal yet approachable voice",
          "- Focus on value and insights"
        );
      } else if (tone === 'casual') {
        suggestions.push(
          "### Casual Tone Optimization",
          "Your post has been optimized for a casual, friendly tone:\n",
          "- Use conversational language",
          "- Share personal experiences",
          "- Keep it relatable and authentic"
        );
      } else {
        suggestions.push(
          "### Storytelling Optimization",
          "Your post has been optimized for storytelling:\n",
          "- Start with a hook",
          "- Build narrative tension",
          "- End with a key takeaway"
        );
      }

      // Add length-specific suggestions
      suggestions.push(
        "\n### Length Analysis",
        `Current word count: ${post.trim().split(/\s+/).length} words`,
        `Target for ${postLength} post: ${
          postLength === 'short' ? '50-100' :
          postLength === 'medium' ? '100-200' :
          '200-300'
        } words`
      );

      // Add engagement suggestions
      suggestions.push(
        "\n### Engagement Optimization",
        "- Add relevant hashtags: #LinkedInTips #ProfessionalGrowth",
        "- Include a call-to-action",
        "- Ask an engaging question",
        "- Break content into readable chunks"
      );

      // Add optimized version
      suggestions.push(
        "\n### Optimized Version",
        "Here's a suggested revision of your post:\n",
        post,
        "\nTry adding:",
        "- A strong opening hook",
        "- Supporting points",
        "- A clear call-to-action"
      );

      setAiSuggestions(suggestions.join("\n"));
      
      // Update analytics with optimized metrics
      setAnalytics(prev => ({
        ...prev,
        contentScore: Math.min(prev.contentScore + 15, 100),
        estimatedReach: Math.floor(prev.estimatedReach * 1.2),
        engagement: Math.min(prev.engagement + 10, 100),
        optimal: true,
        bestPostingTime: "9:00 AM EST",
        hashtagSuggestions: ["linkedintips", "professionalgrowth", "networking", "career"],
      }));

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to optimize post. Please try again.";
      setError(errorMessage);
      console.error("Optimization error:", error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const saveDraft = () => {
    if (post.trim()) {
      const newDraft = {
        id: Date.now(),
        content: post,
        date: new Date().toLocaleString(),
      };
      const updatedDrafts = [...drafts, newDraft];
      setDrafts(updatedDrafts);
      localStorage.setItem("linkedinDrafts", JSON.stringify(updatedDrafts));
    }
  };

  const deleteDraft = (id: number) => {
    const updatedDrafts = drafts.filter((draft) => draft.id !== id);
    setDrafts(updatedDrafts);
    localStorage.setItem("linkedinDrafts", JSON.stringify(updatedDrafts));
  };

  const loadDraft = (content: string) => {
    setPost(content);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Editor Section */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> LinkedIn Post Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full h-48 p-4 border rounded-md bg-background resize-none"
                placeholder="Write your LinkedIn post here..."
                value={post}
                onChange={handlePostChange}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-4">
                  <select
                    className="border rounded-md px-3 py-1 bg-background"
                    value={tone}
                    onChange={(e) => setTone(e.target.value as ToneType)}
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="storytelling">Storytelling</option>
                  </select>
                  <select
                    className="border rounded-md px-3 py-1 bg-background"
                    value={postLength}
                    onChange={(e) => setPostLength(e.target.value as LengthType)}
                  >
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="long">Long</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                    onClick={saveDraft}
                  >
                    Save Draft
                  </button>
                  <button
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                  >
                    {isOptimizing ? "Optimizing..." : "Optimize Post"}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {aiSuggestions && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> AI Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {aiSuggestions}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Analytics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5" /> Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Reach</p>
                  <p className="text-2xl font-bold">{analytics.estimatedReach}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Engagement Score
                  </p>
                  <p className="text-2xl font-bold">{analytics.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Content Score</p>
                  <p className="text-2xl font-bold">{analytics.contentScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Best Posting Time</p>
                  <p className="font-medium">
                    {analytics.bestPostingTime || "Not calculated"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Drafts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Save className="h-5 w-5" /> Saved Drafts
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-3 border rounded-lg bg-background"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-muted-foreground">
                        {draft.date}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadDraft(draft.content)}
                          className="text-sm text-primary hover:text-primary/90"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteDraft(draft.id)}
                          className="text-sm text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm line-clamp-2">{draft.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPostOptimizer;
