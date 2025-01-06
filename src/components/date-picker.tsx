"use client";

import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatEthiopianDate } from "@/lib/EthiopianDateUtils";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPickerProps } from "react-day-picker";

type DatePickerProps = {
  date?: Date;
  setDate?: (date: Date) => void;
} & DayPickerProps;

export default function DatePicker({
  date: propDate,
  setDate: propSetDate,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    propDate ?? new Date()
  );
  const [state, setstate] = React.useState<"gregorian" | "ethiopian">(
    "ethiopian"
  );

  const date = propDate ?? internalDate;
  const setDate = propSetDate ?? setInternalDate;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal pr-2",
            !date && "text-muted-foreground"
          )}
          onClick={() => setOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            state === "ethiopian" ? (
              formatEthiopianDate(date, "PPP")
            ) : (
              format(date, "PPP")
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
        <div className="flex flex-col md:flex-row gap-2">
          <Calendar
            {...props}
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
              }
              setOpen(false);
            }}
            endMonth={new Date(2025, 2)}
            defaultDateLib="Gregorian"
            autoFocus
          />
          <Calendar
            {...props}
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                setDate(newDate);
              }
              setOpen(false);
            }}
            endMonth={new Date(2025, 2)}
            defaultDateLib="Ethiopian"
            autoFocus
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
