"use client"

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  ThumbsUp,
  Hash,
  Users,
  MessageSquare,
  Save,
  Clock,
  BarChart,
  Eye,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LinkedInPostOptimizer = () => {
  const [post, setPost] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [drafts, setDrafts] = useState<
    { id: number; content: string; date: string }[]
  >([]);
  const [showPreview, setShowPreview] = useState(false);
  const [analytics, setAnalytics] = useState({
    estimatedReach: 0,
    engagement: 0,
    optimal: false,
  });

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

  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPost = e.target.value;
    setPost(newPost);
    setSuggestions(analyzePost(newPost));
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
    setSuggestions(analyzePost(draft.content));
  };

  const getPostStats = () => {
    const words = post.trim().split(/\s+/).length;
    const chars = post.length;
    const hashtags = (post.match(/#\w+/g) || []).length;
    const mentions = (post.match(/@\w+/g) || []).length;
    const lines = post.split("\n").length;

    return { words, chars, hashtags, mentions, lines };
  };

  const stats = getPostStats();

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              LinkedIn Post Optimizer
              <div className="space-x-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={saveDraft}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  <Save className="h-5 w-5" />
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-48 p-4 border rounded-lg mb-4"
              placeholder="Write your LinkedIn post here..."
              value={post}
              onChange={handlePostChange}
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{stats.words} words</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span>{stats.chars} chars</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <span>{stats.hashtags} hashtags</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{stats.mentions} mentions</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{stats.lines} lines</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Estimated Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium">Estimated Reach</div>
                <div className="text-2xl font-bold">
                  {analytics.estimatedReach.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Engagement Rate</div>
                <div className="text-2xl font-bold">
                  {analytics.engagement}%
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Optimization Score</div>
                <div
                  className={`text-2xl font-bold ${
                    analytics.optimal ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {analytics.optimal ? "Optimized" : "Needs Improvement"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {aiSuggestions.split("\n").map((suggestion, index) => (
                <Alert key={index}>
                  <AlertDescription>{suggestion}</AlertDescription>
                </Alert>
              ))}
              {suggestions.map((suggestion, index) => (
                <Alert key={`basic-${index}`}>
                  <AlertDescription>{suggestion}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {showPreview && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="font-bold">Your Name</div>
                    <div className="text-sm text-gray-500">Your Headline</div>
                  </div>
                </div>
                <div className="whitespace-pre-wrap">{post}</div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Saved Drafts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {drafts.map((draft) => (
                <div
                  key={draft.id}
                  className="p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => loadDraft(draft)}
                >
                  <div className="font-medium truncate">{draft.content}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(draft.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkedInPostOptimizer;
