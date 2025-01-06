"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatEthiopianDate } from "@/lib/EthiopianDateUtils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

export default function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: addDays(new Date(), -20),
    to: new Date(),
  });
  const [state, setstate] = React.useState<"gregorian" | "ethiopian">(
    "ethiopian"
  );
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal truncate",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {state === "ethiopian"
                    ? formatEthiopianDate(date.from, "PPP")
                    : format(date.from, "PP")}{" "}
                  -{" "}
                  {state === "ethiopian"
                    ? formatEthiopianDate(date.to, "PPP")
                    : format(date.to, "PP")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setstate((prev) =>
                  prev === "ethiopian" ? "gregorian" : "ethiopian"
                );
              }}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "ml-auto size-6"
              )}
            >
              <span className="text-xs">
                {state === "ethiopian" ? "ET" : "GR"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex gap-2">
            <Calendar
              autoFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              defaultDateLib="Gregorian"
            />
            <Calendar
              autoFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              defaultDateLib="Ethiopian"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
