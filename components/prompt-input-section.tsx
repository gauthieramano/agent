"use client";

import type { useChat } from "@ai-sdk/react";
import type { ChatStatus } from "ai";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { MODEL_NAMES, type ModelName } from "@/utils/constants";

type Props = {
  model: ModelName;
  status: ChatStatus;
  sendMessage: ReturnType<typeof useChat>["sendMessage"];
  setModel: Dispatch<SetStateAction<ModelName>>;
};

export default function PromptInputSection({
  model,
  status,
  sendMessage,
  setModel,
}: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files,
      },
      { body: { model } },
    );

    setInput("");
  };

  return (
    <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
      <PromptInputHeader>
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
      </PromptInputHeader>

      <PromptInputBody>
        <PromptInputTextarea
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
      </PromptInputBody>

      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputActionMenu>
            <PromptInputActionMenuTrigger />

            <PromptInputActionMenuContent>
              <PromptInputActionAddAttachments />
            </PromptInputActionMenuContent>
          </PromptInputActionMenu>

          <PromptInputSelect
            onValueChange={(name) => setModel(name as ModelName)}
            value={model}
          >
            <PromptInputSelectTrigger>
              <PromptInputSelectValue />
            </PromptInputSelectTrigger>

            <PromptInputSelectContent>
              {MODEL_NAMES.map((name) => (
                <PromptInputSelectItem key={name} value={name}>
                  {name}
                </PromptInputSelectItem>
              ))}
            </PromptInputSelectContent>
          </PromptInputSelect>
        </PromptInputTools>

        <PromptInputSubmit disabled={!input && !status} status={status} />
      </PromptInputFooter>
    </PromptInput>
  );
}
