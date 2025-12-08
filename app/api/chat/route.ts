import { readFileSync } from "node:fs";
import path from "node:path";
import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  type UIMessage,
} from "ai";
import { MODELS, type ModelName } from "@/utils/constants";
import { executePythonCode } from "@/utils/tools";

// Allow streaming responses up to 1 minute
export const maxDuration = 60;

const MARKDOWN = path.join(process.cwd(), "utils/system-prompt.md");
const SYSTEM_PROMPT = readFileSync(MARKDOWN, "utf-8");
const TOOLS = { executePythonCode };
const MAX_STEPS = 5;

type JsonRequest = {
  messages: UIMessage[];
  model: ModelName;
};

export async function POST(req: Request) {
  const { messages, model }: JsonRequest = await req.json();

  const result = streamText({
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    stopWhen: stepCountIs(MAX_STEPS),

    model: openai(MODELS[model]),

    // As items are not persisted for Zero Data Retention organizations, the
    // calls have to be stateless and the full message history has to be sent
    providerOptions: { openai: { store: false } },
  });

  return result.toUIMessageStreamResponse({ sendReasoning: true });
}
