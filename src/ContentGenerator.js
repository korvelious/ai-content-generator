
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function ContentGenerator() {
  const [niche, setNiche] = useState("");
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateArticle = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generateArticle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ niche }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate article.");
      }

      setArticle(data.article);
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
