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
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import PromptInputSection from "@/components/prompt-input-section";
import TextUiPartMessage from "@/components/text-ui-part-message";
import type { ModelName } from "@/utils/constants";

export default function Home() {
  const [model, setModel] = useState<ModelName>("GPT-5.1");

  const { messages, sendMessage, status, regenerate } = useChat();

  const lastMessageId = messages.at(-1)?.id;

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

        <PromptInputSection
          model={model}
          status={status}
          sendMessage={sendMessage}
          setModel={setModel}
        />
      </div>
    </div>
  );
}
