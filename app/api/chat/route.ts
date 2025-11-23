import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { MODELS, type ModelName } from "@/utils/constants";

// Allow streaming responses up to 1 minute
export const maxDuration = 60;

const SYSTEM_PROMPT =
  "You are a helpful assistant that can answer questions and help with tasks";

type JsonRequest = {
  messages: UIMessage[];
  model: ModelName;
};

export async function POST(req: Request) {
  const { messages, model }: JsonRequest = await req.json();

  const result = streamText({
    messages: convertToModelMessages(messages),
    system: SYSTEM_PROMPT,

    model: openai(MODELS[model]),

    // As items are not persisted for Zero Data Retention organizations, the
    // calls have to be stateless and the full message history has to be sent
    providerOptions: { openai: { store: false } },
  });

  return result.toUIMessageStreamResponse({ sendReasoning: true });
}
