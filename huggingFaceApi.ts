const HF_API_KEY = "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"; // Replace with your actual key

export const queryHuggingFace = async (prompt: string) => {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-3B-Instruct", // Change model if needed
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch from Hugging Face API");
  }

  const result = await response.json();
  return result;
};
