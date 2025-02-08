
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function ContentGenerator() {
  const [niche, setNiche] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateArticle = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          prompt: `Generate an SEO-optimized blog post about: ${niche}`,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate article. Please try again later.");
      }

      const data = await response.json();
      setArticle(data.choices[0].text);
    } catch (error) {
      console.error("Error generating article:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Niche Content Generator</h1>
      <input
        type="text"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        placeholder="Enter your niche (e.g., fitness, tech, finance)"
        className="border rounded p-2 w-full mb-4"
      />
      <Button onClick={generateArticle} disabled={loading || !niche.trim()}>
        {loading ? "Generating..." : "Generate Article"}
      </Button>

      {error && (
        <div className="text-red-500 mt-4">{error}</div>
      )}

      {article && (
        <Card className="mt-6">
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Generated Article:</h2>
            <p className="whitespace-pre-wrap">{article}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
