"use client";

import React from "react";
import { CodeBlockWithTabs, LoadingState } from "@/components/ui/code-block-with-tabs";
import DateRangePicker from "@/components/date-range-picker";

async function getDateRangePickerCode() {
  const response = await fetch("/api/code/date-range-picker");
  if (!response.ok) {
    throw new Error("Failed to fetch date range picker code");
  }
  return response.text();
}



export default function DateRangePickerCodeBlock() {
  const [code, setCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    getDateRangePickerCode().then(setCode).catch(console.error);
  }, []);

  if (!code) {
    return <LoadingState />;
  }

  return (
    <CodeBlockWithTabs
      previewContent={<DateRangePicker />}
      codeBlocks={[
        {
          code,
          filename: "src/components/date-range-picker.tsx",
          value: "code",
          label: "Code",
        },
      ]}
    />
  );
}
