import { Timeline } from "./timeline";
import { Suspense } from "react";
import CalendarCodeBlock from "./CalendarCodeBlock";
import DatePickerCodeBlock from "./DatePickerCodeBlock";
import DateRangePickerCodeBlock from "./DateRangePickerCodeBlock";
import DateUtilsCodeBlock from "./DateUtilsCodeBlock";

const steps = [
  {
    title: "Install Dependencies",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm">
          Install react-day-picker v9.5.0. Note that the default installation
          from shadcn/ui might not work with this implementation.
        </p>
        <pre className="bg-muted p-4 rounded-lg text-sm">
          <code>npm install react-day-picker@9.5.0</code>
        </pre>
        <p className="text-sm text-muted-foreground mt-2">
          Visit{" "}
          <a
            href="https://react-day-picker.js.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            react-day-picker documentation
          </a>{" "}
          for more details.
        </p>
      </div>
    ),
  },
  {
    title: "Setup shadcn/ui",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm">
          Initialize shadcn/ui and install required components:
        </p>
        <pre className="bg-muted p-4 rounded-lg text-sm">
          <code>
            npx shadcn-ui@latest init{"\n"}
            npx shadcn-ui@latest add button{"\n"}
            npx shadcn-ui@latest add popover
          </code>
        </pre>
        <p className="text-sm text-muted-foreground mt-2">
          Visit{" "}
          <a
            href="https://ui.shadcn.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            shadcn/ui documentation
          </a>{" "}
          for detailed setup instructions.
        </p>
      </div>
    ),
  },
  {
    title: "Add Date Utils",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm">
          Copy the Ethiopian date utility files to your lib directory:
        </p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <DateUtilsCodeBlock />
        </Suspense>
        <p className="text-sm mt-4">
          These files contain the core date conversion and formatting utilities
          for Ethiopian calendar, including a custom DateLib implementation for
          react-day-picker.
        </p>
      </div>
    ),
  },
  {
    title: "Setup Calendar",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm">
          Create calendar.tsx in your components/ui directory:
        </p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <CalendarCodeBlock />
        </Suspense>
        <p className="text-sm mt-4">
          This component extends react-day-picker with Ethiopian calendar
          functionality.
        </p>
      </div>
    ),
  },
  {
    title: "Add Date Picker",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm">Create a single date picker component:</p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <DatePickerCodeBlock />
        </Suspense>
        <p className="text-sm mt-4">
          This component provides a UI for selecting a single date with
          Ethiopian calendar support.
        </p>
      </div>
    ),
  },
  {
    title: "Add Date Range Picker",
    content: (
      <div className="prose prose-xs dark:prose-invert">
        <p className="text-sm">Create a date range picker component:</p>
        <Suspense
          fallback={<div className="animate-pulse h-32 bg-muted rounded-lg" />}
        >
          <DateRangePickerCodeBlock />
        </Suspense>
        <p className="text-sm mt-4">
          This component provides a UI for selecting a date range with Ethiopian
          calendar support.
        </p>
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
