export default async function handler(req, res) {
  const { niche } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an expert content writer." },
          { role: "user", content: `Generate an SEO-optimized blog post about: ${niche}` }
        ],
        max_tokens: 800,
      }),
    });

    const text = await response.text();  // Read response as plain text
    console.log("Raw API Response:", text);  // Log the raw response

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = JSON.parse(text);  // Parse JSON after logging
    res.status(200).json({ article: data.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate article" });
  }
}
