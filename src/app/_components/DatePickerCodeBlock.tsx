"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DatePicker from "@/components/date-picker";

async function getDatePickerCode() {
  const response = await fetch("/api/code/date-picker");
  if (!response.ok) {
    throw new Error("Failed to fetch date picker code");
  }
  return response.text();
}

function LoadingState() {
  return (
    <div className="w-full h-32 rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <p className="text-sm text-muted-foreground">Loading code...</p>
    </div>
  );
}

export default function DatePickerCodeBlock() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    getDatePickerCode().then(setCode).catch(console.error);
  }, []);

  if (!code) {
    return <LoadingState />;
  }

  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="preview" className="flex-1">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="flex-1">
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-0">
        <div className="flex items-center justify-center rounded-lg border bg-card p-8">
          <DatePicker />
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-0">
        <div className="relative">
          <div
            className={`overflow-hidden transition-all rounded-lg duration-300 ${
              isExpanded ? "max-h-[700px] overflow-y-auto" : "max-h-96"
            }`}
          >
            <CodeBlock
              language="tsx"
              filename="src/components/date-picker.tsx"
              code={code}
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
    </Tabs>
  );
}
