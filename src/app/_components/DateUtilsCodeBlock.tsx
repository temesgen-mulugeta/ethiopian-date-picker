"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getDateLibCode() {
  const response = await fetch("/api/code/date-lib");
  if (!response.ok) {
    throw new Error("Failed to fetch date lib code");
  }
  return response.text();
}

async function getDateUtilsCode() {
  const response = await fetch("/api/code/date-utils");
  if (!response.ok) {
    throw new Error("Failed to fetch date utils code");
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

export default function DateUtilsCodeBlock() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [libCode, setLibCode] = React.useState<string | null>(null);
  const [utilsCode, setUtilsCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    getDateLibCode().then(setLibCode).catch(console.error);
    getDateUtilsCode().then(setUtilsCode).catch(console.error);
  }, []);

  if (!libCode || !utilsCode) {
    return <LoadingState />;
  }

  return (
    <Tabs defaultValue="lib" className="w-full">
      <TabsList className="w-full justify-start mb-4">
        <TabsTrigger value="lib" className="flex-1">
          DateLib
        </TabsTrigger>
        <TabsTrigger value="utils" className="flex-1">
          Date Utils
        </TabsTrigger>
      </TabsList>
      <TabsContent value="lib" className="mt-0">
        <div className="relative">
          <div
            className={`overflow-hidden transition-all rounded-lg duration-300 ${
              isExpanded ? "max-h-[700px] overflow-y-auto" : "max-h-96"
            }`}
          >
            <CodeBlock
              language="tsx"
              filename="src/lib/EthiopianDateLib.tsx"
              code={libCode}
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
      <TabsContent value="utils" className="mt-0">
        <div className="relative">
          <div
            className={`overflow-hidden transition-all rounded-lg duration-300 ${
              isExpanded ? "max-h-[700px] overflow-y-auto" : "max-h-96"
            }`}
          >
            <CodeBlock
              language="tsx"
              filename="src/lib/EthiopianDateUtils.tsx"
              code={utilsCode}
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
