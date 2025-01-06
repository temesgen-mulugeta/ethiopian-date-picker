"use client";

import React from "react";
import { CodeBlockWithTabs, LoadingState } from "@/components/ui/code-block-with-tabs";
import DatePicker from "@/components/date-picker";

async function getDatePickerCode() {
  const response = await fetch("/api/code/date-picker");
  if (!response.ok) {
    throw new Error("Failed to fetch date picker code");
  }
  return response.text();
}



export default function DatePickerCodeBlock() {
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    getDatePickerCode().then(setCode).catch(console.error);
  }, []);

  if (!code) {
    return <LoadingState />;
  }

  return (
    <CodeBlockWithTabs
      previewContent={<DatePicker />}
      codeBlocks={[
        {
          code,
          filename: "src/components/date-picker.tsx",
          value: "code",
          label: "Code",
        },
      ]}
    />
  );
}
