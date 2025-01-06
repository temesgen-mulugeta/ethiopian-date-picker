"use client";

import React, { Suspense } from "react";
import {
  CodeBlockWithTabs,
  LoadingState,
} from "@/components/ui/code-block-with-tabs";

async function getCalendarCode() {
  const response = await fetch("/api/code/calendar");
  if (!response.ok) {
    throw new Error("Failed to fetch calendar code");
  }
  return response.text();
}

export default function CalendarCodeBlock() {
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    getCalendarCode().then(setCode).catch(console.error);
  }, []);

  if (!code) {
    return <LoadingState />;
  }

  return (
    <Suspense fallback={<LoadingState />}>
      <CodeBlockWithTabs
        hideTabs
        codeBlocks={[
          {
            code,
            filename: "src/components/ui/calendar.tsx",
            value: "code",
            label: "Code",
          },
        ]}
      />
    </Suspense>
  );
}
