"use client";

import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { CodeBlock, CodeBlockCopyButton } from "./ai-elements/code-block";
import { Tool, ToolContent, ToolHeader, ToolInput } from "./ai-elements/tool";

type PartInput = { code?: string };

type Props = {
  part: UIMessagePart<UIDataTypes, UITools>;
  role: UIMessage<unknown, UIDataTypes, UITools>["role"];
};

export default function PythonCodeToolMessage({ part, role }: Props) {
  if (part.type !== "tool-executePythonCode") {
    return null;
  }

  const code = (part.input as PartInput | undefined)?.code || "";
  const output = (part.output as string | undefined) || "";

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

        {part.state === "output-available" && (
          <div>
            <p className="pb-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
              The result
            </p>
            {output}
          </div>
        )}
      </MessageContent>
    </Message>
  );
}
