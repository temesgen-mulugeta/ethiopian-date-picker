"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar3";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatEthiopianDate } from "@/utils/EthiopianDateUtils";
import { CalendarIcon } from "lucide-react";

export default function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatEthiopianDate(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex  gap-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            endMonth={new Date(2025, 2)}
            defaultDateLib="Gregorian"
            autoFocus
          />
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            endMonth={new Date(2025, 2)}
            autoFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
