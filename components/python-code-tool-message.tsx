"use client";

import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Tool, ToolContent, ToolHeader, ToolInput } from "./ai-elements/tool";
import CodeToolInput from "./code-tool-input";

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
      <MessageContent className="w-full">
        <Tool>
          <ToolHeader state={part.state} type={part.type} />
          <ToolContent>
            <ToolInput input={part.input} />

            <CodeToolInput code={code} title="Executed code" />

            <CodeToolInput code={output} title="Result" />
          </ToolContent>
        </Tool>
      </MessageContent>
    </Message>
  );
}
