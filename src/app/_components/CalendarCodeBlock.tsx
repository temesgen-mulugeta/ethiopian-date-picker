"use client";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

async function getCalendarCode() {
  const response = await fetch("/api/code/calendar");
  if (!response.ok) {
    throw new Error("Failed to fetch calendar code");
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

export default function CalendarCodeBlock() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    getCalendarCode().then(setCode).catch(console.error);
  }, []);

  if (!code) {
    return <LoadingState />;
  }

  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-all rounded-lg duration-300 ${
          isExpanded ? "max-h-[700px] overflow-y-auto" : "max-h-96"
        }`}
      >
        <CodeBlock
          language="tsx"
          filename="src/components/ui/calendar.tsx"
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
  );
}
