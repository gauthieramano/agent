"use client";

import type { useChat } from "@ai-sdk/react";
import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { ModelName } from "@/utils/constants";
import { CodeBlock, CodeBlockCopyButton } from "./ai-elements/code-block";
import { Loader } from "./ai-elements/loader";
import { Tool, ToolContent, ToolHeader, ToolInput } from "./ai-elements/tool";

type PartInput = { code?: string };

type Props = {
  isLastMessage: boolean;
  model: ModelName;
  part: UIMessagePart<UIDataTypes, UITools>;
  role: UIMessage<unknown, UIDataTypes, UITools>["role"];
  regenerate: ReturnType<typeof useChat>["regenerate"];
};

export default function PythonCodeToolMessage({
  isLastMessage,
  model,
  part,
  role,
  regenerate,
}: Props) {
  if (part.type !== "tool-executePythonCode") {
    return null;
  }

  const code = (part.input as PartInput | undefined)?.code || "";
  const output = (part.output as string | undefined) || "";
  const isOutputAvailable = part.state === "output-available";
  const isInputStreaming = part.state === "input-streaming";

  return (
    <Message from={role}>
      <MessageContent className="max-w-full">
        <Tool>
          <ToolHeader state={part.state} type={part.type} />
          <ToolContent className="">
            <ToolInput input={part.input} />

            <p className="px-4 pt-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              The code executed
            </p>

            <CodeBlock
              code={code}
              language="py"
              className="m-4 max-w-[calc(100%-(var(--spacing)*8))]"
            >
              <CodeBlockCopyButton
                onCopy={() => console.log("Copied code to clipboard")}
                onError={() =>
                  console.error("Failed to copy code to clipboard")
                }
              />
            </CodeBlock>
          </ToolContent>
        </Tool>

        {isOutputAvailable && (
          <p className="pb-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
            The result
          </p>
        )}

        <MessageResponse>{output}</MessageResponse>
      </MessageContent>

      {isInputStreaming && <Loader />}

      {role === "assistant" && isLastMessage && !isInputStreaming && (
        <MessageActions>
          <MessageAction
            onClick={() => regenerate({ body: { model } })}
            label="Retry"
          >
            <RefreshCcwIcon className="size-3" />
          </MessageAction>

          <MessageAction
            onClick={() => navigator.clipboard.writeText(output)}
            label="Copy"
          >
            <CopyIcon className="size-3" />
          </MessageAction>
        </MessageActions>
      )}
    </Message>
  );
}
