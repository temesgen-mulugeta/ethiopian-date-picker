"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodeBlockWithTabsProps {
  previewContent?: React.ReactNode;
  hideTabs?: boolean;
  codeBlocks: Array<{
    code: string;
    filename: string;
    language?: string;
    label: string;
    value: string;
  }>;
}

export function LoadingState() {
  return (
    <div className="w-full h-32 rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading code...</p>
    </div>
  );
}

export function CodeBlockWithTabs({
  previewContent,
  codeBlocks,
  hideTabs = false,
}: CodeBlockWithTabsProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const hasPreview = Boolean(previewContent);
  const defaultTab = hasPreview ? "preview" : codeBlocks[0]?.value;

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      {!hideTabs && (
        <TabsList className="w-full justify-start mb-4">
          {hasPreview && (
            <TabsTrigger value="preview" className="flex-1">
              Preview
            </TabsTrigger>
          )}
          {codeBlocks.map((block) => (
            <TabsTrigger
              key={block.value}
              value={block.value}
              className="flex-1"
            >
              {block.label}
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      {hasPreview && (
        <TabsContent value="preview" className="mt-0">
          <div className="flex items-center justify-center rounded-lg border bg-card p-8">
            {previewContent}
          </div>
        </TabsContent>
      )}

      {codeBlocks.map((block) => (
        <TabsContent key={block.value} value={block.value} className="mt-0">
          <div className="relative bg-[#10172A] rounded-lg">
            <div
              className={`overflow-hidden transition-all rounded-lg duration-300 ${
                isExpanded ? "max-h-[700px] overflow-y-auto" : "max-h-96"
              }`}
            >
              <CodeBlock
                language={block.language || "tsx"}
                filename={block.filename}
                code={block.code}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 rounded-b-lg bg-gradient-to-t from-black to-transparent pointer-events-none" />
            <Button
              size="sm"
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
