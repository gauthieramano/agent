import type { ComponentProps } from "react";
import type { BundledLanguage } from "shiki/types";
import { cn } from "@/lib/utils";
import { CodeBlock, CodeBlockCopyButton } from "./ai-elements/code-block";

export type Props = ComponentProps<"div"> & {
  code: string;
  title: string;
  language?: BundledLanguage;
};

/** Variation of `ToolInput` from `components/ai-elements/tool.tsx` */
export default function CodeToolInput({
  code,
  className,
  title,
  language,
  ...props
}: Props) {
  return (
    <div className={cn("space-y-2 overflow-hidden p-4", className)} {...props}>
      <h4 className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </h4>

      <div className="rounded-md bg-muted/50">
        <CodeBlock
          code={code}
          language={language || "python"}
          className={className}
        >
          <CodeBlockCopyButton
            onCopy={() => console.log("Copied code to clipboard")}
            onError={() => console.error("Failed to copy code to clipboard")}
          />
        </CodeBlock>
      </div>
    </div>
  );
}
