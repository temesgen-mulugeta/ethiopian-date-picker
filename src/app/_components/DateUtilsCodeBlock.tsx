"use client";

import React from "react";
import { CodeBlockWithTabs, LoadingState } from "@/components/ui/code-block-with-tabs";

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


export default function DateUtilsCodeBlock() {
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
    <CodeBlockWithTabs
      codeBlocks={[
        {
          code: libCode,
          filename: "src/lib/EthiopianDateLib.tsx",
          value: "lib",
          label: "DateLib",
        },
        {
          code: utilsCode,
          filename: "src/lib/EthiopianDateUtils.tsx",
          value: "utils",
          label: "Date Utils",
        },
      ]}
    />
  );
}
