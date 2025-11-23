"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
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
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import TextUiPartMessage from "@/components/text-ui-part-message";
import { MODEL_NAMES, type ModelName } from "@/utils/constants";

export default function Home() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<ModelName>("GPT-5.1");

  const { messages, sendMessage, status, regenerate } = useChat();

  const lastMessageId = messages.at(-1)?.id;

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
    <div className="relative mx-auto size-full h-screen max-w-4xl p-6">
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, partIndex) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <TextUiPartMessage
                          key={`${message.id}-${partIndex}`}
                          isLastMessage={message.id === lastMessageId}
                          model={model}
                          part={part}
                          role={message.role}
                          regenerate={regenerate}
                        />
                      );

                    case "reasoning":
                      return (
                        <Reasoning
                          key={`${message.id}-${partIndex}`}
                          className="w-full"
                          isStreaming={
                            status === "streaming" &&
                            partIndex === message.parts.length - 1 &&
                            message.id === lastMessageId
                          }
                        >
                          <ReasoningTrigger />

                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            ))}

            {status === "submitted" && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput
          onSubmit={handleSubmit}
          className="mt-4"
          globalDrop
          multiple
        >
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
      </div>
    </div>
  );
}
