"use client";
import { Calendar2 } from "@/components/custom-date-picker";
import DatePicker from "@/components/date-picker";
import DateRangePicker from "@/components/date-range-picker";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <DatePicker />
        <DateRangePicker />
        <Calendar2 />
    
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
