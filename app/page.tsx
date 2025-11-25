"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { match } from "ts-pattern";
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
import PythonCodeToolMessage from "@/components/python-code-tool-message";
import TextUiPartMessage from "@/components/text-ui-part-message";
import type { ModelName } from "@/utils/constants";

export default function Home() {
  const [model, setModel] = useState<ModelName>("GPT-5.1");

  const { messages, sendMessage, status, regenerate } = useChat({
    onFinish: ({ message }) => {
      console.log({ message });
    },
  });

  const lastMessageId = messages.at(-1)?.id;

  return (
    <div className="relative mx-auto size-full h-screen max-w-4xl p-6">
      <div className="flex h-full flex-col">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, partIndex) =>
                  match(part)
                    .with({ type: "text" }, (part) => (
                      <TextUiPartMessage
                        key={`${message.id}-${partIndex}`}
                        isLastMessage={message.id === lastMessageId}
                        model={model}
                        part={part}
                        role={message.role}
                        regenerate={regenerate}
                      />
                    ))

                    .with({ type: "tool-executePythonCode" }, (part) => (
                      <PythonCodeToolMessage
                        key={`${message.id}-${part.toolCallId}`}
                        isLastMessage={message.id === lastMessageId}
                        model={model}
                        part={part}
                        role={message.role}
                        regenerate={regenerate}
                      />
                    ))

                    .with({ type: "reasoning" }, (part) => (
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
                    ))

                    .otherwise(() => null),
                )}
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
