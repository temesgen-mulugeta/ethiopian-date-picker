import { TerminalBlock } from "@/components/ui/terminal-block";
import { Package2 } from "lucide-react";
import { Suspense } from "react";
import CalendarCodeBlock from "./CalendarCodeBlock";
import DatePickerCodeBlock from "./DatePickerCodeBlock";
import DateRangePickerCodeBlock from "./DateRangePickerCodeBlock";
import DateUtilsCodeBlock from "./DateUtilsCodeBlock";
import { Timeline } from "./timeline";

const steps = [
  {
    title: "Install Dependencies",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm pb-2">
          To get started, install react-day-picker version 9.5.0, which provides
          the core date picker functionality.
          <div className="rounded-md mt-2  gap-2 border p-3 text-yellow-600 flex">
            <Package2 />
            <p>
              Note that the default installation from shadcn/ui might not work
              with this implementation. Visit
              <a
                href="https://react-day-picker.js.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 font-semibold hover:underline px-2"
              >
                react-day-picker documentation
              </a>{" "}
              for more details.
            </p>
          </div>
        </p>
        <pre className="bg-muted p-4 rounded-lg text-sm">
          <TerminalBlock code="npm install react-day-picker@9.5.0" prompt="$" />
        </pre>
      </div>
    ),
  },
  {
    title: "Setup shadcn/ui",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm pb-4">
          Initialize shadcn/ui and install the Button and Popover components:
          Visit{" "}
          <a
            href="https://ui.shadcn.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            shadcn/ui documentation
          </a>{" "}
          for detailed setup instructions. You&apos;ll need these components to
          build the date picker interface.
        </p>
        <pre className="bg-muted p-4 rounded-lg text-sm ">
          <TerminalBlock
            code="npx shadcn-ui@latest add button popover"
            prompt="$"
          />
        </pre>
      </div>
    ),
  },
  {
    title: "Add Date Utils",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm  pb-4">
          Copy the Ethiopian date utility files to your lib directory: These
          files contain the core date conversion and formatting utilities for
          Ethiopian calendar, including a custom DateLib implementation for
          react-day-picker.
        </p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <DateUtilsCodeBlock />
        </Suspense>
      </div>
    ),
  },
  {
    title: "Setup Calendar",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm  pb-4">
          Create calendar.tsx in your components/ui directory: This component
          extends shadcn/ui&apos;s calendar component and is inspired by{" "}
          <a
            href="https://github.com/shadcn/shadcn-date-picker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-600 hover:underline"
          >
            shadcn-date-picker
          </a>
          .
        </p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <CalendarCodeBlock />
        </Suspense>
      </div>
    ),
  },
  {
    title: "Add Date Picker",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm  pb-4">
          Create a date picker component that allows selecting individual dates
          with full Ethiopian calendar support. This component integrates the
          calendar we created earlier with a popover.
        </p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <DatePickerCodeBlock />
        </Suspense>
      </div>
    ),
  },
  {
    title: "Add Date Range Picker",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm pb-2">
          Create a date range picker component that enables users to select
          start and end dates using the Ethiopian calendar. This component
          builds on the single date picker and adds range selection.
        </p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <DateRangePickerCodeBlock />
        </Suspense>
      </div>
    ),
  },
];

export default function Steps() {
  return (
    <div className="w-full">
      <Timeline data={steps} />
    </div>
  );
}
