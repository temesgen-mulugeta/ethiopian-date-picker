"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar3";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatEthiopianDate } from "@/utils/EthiopianDateUtils";
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

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatEthiopianDate(date.from, "PPP")} -{" "}
                  {formatEthiopianDate(date.to, "PPP")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
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
