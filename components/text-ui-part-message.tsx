"use client";

import type { useChat } from "@ai-sdk/react";
import type { TextUIPart, UIDataTypes, UIMessage, UITools } from "ai";
import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { ModelName } from "@/utils/constants";

type Props = {
  isLastMessage: boolean;
  model: ModelName;
  part: TextUIPart;
  role: UIMessage<unknown, UIDataTypes, UITools>["role"];
  regenerate: ReturnType<typeof useChat>["regenerate"];
};

export default function TextUiPartMessage({
  isLastMessage,
  model,
  part,
  role,
  regenerate,
}: Props) {
  return (
    <Message from={role}>
      <MessageContent>
        <MessageResponse>{part.text}</MessageResponse>
      </MessageContent>

      {role === "assistant" && isLastMessage && (
        <MessageActions>
          <MessageAction
            onClick={() => regenerate({ body: { model } })}
            label="Retry"
          >
            <RefreshCcwIcon className="size-3" />
          </MessageAction>

          <MessageAction
            onClick={() => navigator.clipboard.writeText(part.text)}
            label="Copy"
          >
            <CopyIcon className="size-3" />
          </MessageAction>
        </MessageActions>
      )}
    </Message>
  );
}
