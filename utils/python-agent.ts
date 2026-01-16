import { readFileSync } from "node:fs";
import path from "node:path";
import { openai } from "@ai-sdk/openai";
import {
  type SystemModelMessage,
  stepCountIs,
  ToolLoopAgent,
  type ToolSet,
} from "ai";
import { MODELS, type ModelName } from "./constants";
import { executePythonCode } from "./python-tool";

const MARKDOWN = path.join(process.cwd(), "utils/system-prompt.md");

const SYSTEM_PROMPT = {
  role: "system",
  content: readFileSync(MARKDOWN, "utf-8"),
} satisfies SystemModelMessage;

const TOOLS = { executePythonCode } satisfies ToolSet;
const MAX_STEPS = 5;

export const pythonAgent = (model: ModelName) =>
  new ToolLoopAgent({
    instructions: SYSTEM_PROMPT,
    tools: TOOLS,
    stopWhen: stepCountIs(MAX_STEPS),

    model: openai(MODELS[model]),

    // As items are not persisted for Zero Data Retention organizations, the
    // calls have to be stateless and the full message history has to be sent
    providerOptions: { openai: { store: false } },
  });
