import { handleQAChat } from "@/packages/leele-ai/src";

export async function POST(req: Request) {
  const prompt =
    "You are a helpful AI assistant. Answer the user's yes/no question and provide a brief explanation.";
  const inappropriateDefiningPrompt =
    "If the question is about Mathematics, it is inappropriate.";
  try {
    return await handleQAChat(req, prompt, inappropriateDefiningPrompt);
  } catch (error) {
    console.error("Error in QA chat:", error);
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
