import { createAgentUIStreamResponse, type UIMessage } from "ai";
import type { ModelName } from "@/utils/constants";
import { pythonAgent } from "@/utils/python-agent";

// Allow streaming responses up to 1 minute
export const maxDuration = 60;

type JsonRequest = {
  messages: UIMessage[];
  model: ModelName;
};

export async function POST(req: Request) {
  const { messages, model }: JsonRequest = await req.json();

  return createAgentUIStreamResponse({
    agent: pythonAgent(model),
    uiMessages: messages,
  });
}
