"use client";

import * as React from "react";
import { DayPicker, useDayPicker, type DayPickerProps } from "react-day-picker";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { differenceInCalendarDays } from "date-fns";
import {
  toEth,
  toGreg,
  getEtMonthName,
  ethMonths,
} from "@/utils/EthiopianDateUtils";
import { EthiopianDateLib } from "@/utils/EthiopianDateLib";

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 16
   */
  yearRange?: number;
};

/**
 * A custom calendar component built on top of react-day-picker.
 * @param props The props for the calendar.
 * @default yearRange 12
 * @returns
 */
function Calendar({
  className,
  showOutsideDays = true,
  yearRange = 16,
  numberOfMonths,
  ...props
}: CalendarProps) {
  const [navView, setNavView] = React.useState<"days" | "months" | "years">(
    "days"
  );
  const [displayYears, setDisplayYears] = React.useState<{
    from: number;
    to: number;
  }>(
    React.useMemo(() => {
      const currentYear = new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [yearRange])
  );

  const { startMonth, endMonth, month } = props;
  console.log("prop.month", month);

  const columnsDisplayed =
    navView === "years" || navView === "months" ? 1 : numberOfMonths;

  const _monthsClassName = cn("relative flex", props.classNames?.months);
  const _monthCaptionClassName = cn(
    "relative mx-10 flex h-7 items-center justify-center",
    props.classNames?.month_caption
  );
  const _weekdaysClassName = cn("flex flex-row", props.classNames?.weekdays);
  const _weekdayClassName = cn(
    "w-8 text-sm font-normal text-muted-foreground",
    props.classNames?.weekday
  );
  const _monthClassName = cn("w-full", props.classNames?.month);
  const _captionClassName = cn(
    "relative flex items-center justify-center pt-1",
    props.classNames?.caption
  );
  const _captionLabelClassName = cn(
    "truncate text-sm font-medium",
    props.classNames?.caption_label
  );
  const buttonNavClassName = buttonVariants({
    variant: "outline",
    className:
      "absolute h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
  });
  const _buttonNextClassName = cn(
    buttonNavClassName,
    "right-0",
    props.classNames?.button_next
  );
  const _buttonPreviousClassName = cn(
    buttonNavClassName,
    "left-0",
    props.classNames?.button_previous
  );
  const _navClassName = cn("flex items-start", props.classNames?.nav);
  const _monthGridClassName = cn("mx-auto mt-4", props.classNames?.month_grid);
  const _weekClassName = cn(
    "mt-2 flex w-max items-start",
    props.classNames?.week
  );
  const _dayClassName = cn(
    "flex size-8 flex-1 items-center justify-center p-0 text-sm",
    props.classNames?.day
  );
  const _dayButtonClassName = cn(
    buttonVariants({ variant: "ghost" }),
    "size-8 rounded-md p-0 font-normal transition-none aria-selected:opacity-100",
    props.classNames?.day_button
  );
  const buttonRangeClassName =
    "bg-accent [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground";
  const _rangeStartClassName = cn(
    buttonRangeClassName,
    "day-range-start rounded-s-md",
    props.classNames?.range_start
  );
  const _rangeEndClassName = cn(
    buttonRangeClassName,
    "day-range-end rounded-e-md",
    props.classNames?.range_end
  );
  const _rangeMiddleClassName = cn(
    "bg-accent !text-foreground [&>button]:bg-transparent [&>button]:!text-foreground [&>button]:hover:bg-transparent [&>button]:hover:!text-foreground",
    props.classNames?.range_middle
  );
  const _selectedClassName = cn(
    "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
    props.classNames?.selected
  );
  const _todayClassName = cn(
    "[&>button]:bg-accent [&>button]:text-accent-foreground",
    props.classNames?.today
  );
  const _outsideClassName = cn(
    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
    props.classNames?.outside
  );
  const _disabledClassName = cn(
    "text-muted-foreground opacity-50",
    props.classNames?.disabled
  );
  const _hiddenClassName = cn("invisible flex-1", props.classNames?.hidden);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      style={{
        width: 248.8 * (columnsDisplayed ?? 1) + "px",
      }}
      dateLib={new EthiopianDateLib()}
      classNames={{
        months: _monthsClassName,
        month_caption: _monthCaptionClassName,
        weekdays: _weekdaysClassName,
        weekday: _weekdayClassName,
        month: _monthClassName,
        caption: _captionClassName,
        caption_label: _captionLabelClassName,
        button_next: _buttonNextClassName,
        button_previous: _buttonPreviousClassName,
        nav: _navClassName,
        month_grid: _monthGridClassName,
        week: _weekClassName,
        day: _dayClassName,
        day_button: _dayButtonClassName,
        range_start: _rangeStartClassName,
        range_middle: _rangeMiddleClassName,
        range_end: _rangeEndClassName,
        selected: _selectedClassName,
        today: _todayClassName,
        outside: _outsideClassName,
        disabled: _disabledClassName,
        hidden: _hiddenClassName,
      }}
      components={{
        Chevron: () => {
          return <></>;
        },
        Nav: ({ className, ...props }) => {
          const { goToMonth, nextMonth, previousMonth, months } =
            useDayPicker();
          console.log("months", months);
          const handlePreviousClick = React.useCallback(() => {
            if (!previousMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from - (prev.to - prev.from + 1),
                to: prev.to - (prev.to - prev.from + 1),
              }));
              return;
            }

            if (navView === "months") {
              const newDate = toGreg({
                Year: currentEthDate.Year - 1,
                Month: currentEthDate.Month,
                Day: 1,
              });
              goToMonth(newDate);
              return;
            }
            // In days view, go to previous month
            const prevDate = new Date(currentDate);
            prevDate.setMonth(prevDate.getMonth() - 1);
            goToMonth(prevDate);
          }, [navView, selectedMonth, goToMonth]);

          const handleNextClick = React.useCallback(() => {
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from + (prev.to - prev.from + 1),
                to: prev.to + (prev.to - prev.from + 1),
              }));
              return;
            }
            const currentDate = selectedMonth || new Date();
            const currentEthDate = toEth(currentDate);
            if (navView === "months") {
              const newDate = toGreg({
                Year: currentEthDate.Year + 1,
                Month: currentEthDate.Month,
                Day: 1,
              });
              goToMonth(newDate);
              return;
            }
            // In days view, go to next month
            const nextDate = new Date(currentDate);
            nextDate.setMonth(nextDate.getMonth() + 1);
            goToMonth(nextDate);
          }, [navView, selectedMonth, goToMonth]);

          const isPreviousDisabled = (() => {
            if (navView === "years") {
              return (
                (startMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.from - 1, 0, 1),
                    startMonth
                  ) < 0) ||
                (endMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.from - 1, 0, 1),
                    endMonth
                  ) > 0)
              );
            }
            if (navView === "months") {
              const currentDate = selectedMonth || new Date();
              const currentEthDate = toEth(currentDate);
              const prevYearDate = toGreg({
                Year: currentEthDate.Year - 1,
                Month: currentEthDate.Month,
                Day: 1,
              });
              return startMonth && prevYearDate < startMonth;
            }
            return !previousMonth;
          })();

          const isNextDisabled = (() => {
            if (navView === "years") {
              return (
                (startMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.to + 1, 0, 1),
                    startMonth
                  ) < 0) ||
                (endMonth &&
                  differenceInCalendarDays(
                    new Date(displayYears.to + 1, 0, 1),
                    endMonth
                  ) > 0)
              );
            }
            if (navView === "months") {
              const currentDate = selectedMonth || new Date();
              const currentEthDate = toEth(currentDate);
              const nextYearDate = toGreg({
                Year: currentEthDate.Year + 1,
                Month: currentEthDate.Month,
                Day: 1,
              });
              return endMonth && nextYearDate > endMonth;
            }
            return !nextMonth;
          })();

          return (
            <nav className={cn("flex items-center", className)} {...props}>
              <Button
                variant="outline"
                className="absolute left-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isPreviousDisabled ? undefined : -1}
                disabled={isPreviousDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the previous ${
                        displayYears.to - displayYears.from + 1
                      } years`
                    : navView === "months"
                    ? `Go to previous year`
                    : `Go to previous month`
                }
                onClick={handlePreviousClick}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="absolute right-0 size-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isNextDisabled ? undefined : -1}
                disabled={isNextDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the next ${
                        displayYears.to - displayYears.from + 1
                      } years`
                    : navView === "months"
                    ? `Go to next year`
                    : `Go to next month`
                }
                onClick={handleNextClick}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          );
        },
        CaptionLabel: () => {
          const currentEthDate = toEth(selectedMonth || new Date());
          return (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="h-7 flex-1 font-normal hover:bg-accent hover:text-accent-foreground"
                onClick={() =>
                  setNavView((prev) => (prev === "months" ? "days" : "months"))
                }
              >
                {getEtMonthName(currentEthDate.Month)}
              </Button>
              <Button
                variant="outline"
                className="h-7 flex-1 font-normal hover:bg-accent hover:text-accent-foreground"
                onClick={() =>
                  setNavView((prev) => (prev === "years" ? "days" : "years"))
                }
              >
                {currentEthDate.Year}
              </Button>
            </div>
          );
        },
        MonthGrid: ({ className, ...props }) => {
          const { goToMonth } = useDayPicker();

          if (navView === "years") {
            return (
              <YearGrid
                className={className}
                currentMonth={selectedMonth || new Date()}
                displayYears={displayYears}
                startMonth={startMonth}
                endMonth={endMonth}
                onSelect={(date) => {
                  goToMonth(date);
                  setNavView("days");
                }}
              />
            );
          }

          if (navView === "months") {
            return (
              <MonthGrid
                className={className}
                currentMonth={selectedMonth || new Date()}
                startMonth={startMonth}
                endMonth={endMonth}
                onSelect={(date) => {
                  goToMonth(date);
                  setNavView("days");
                }}
              />
            );
          }

          return (
            <table className={className} {...props}>
              {props.children}
            </table>
          );
        },
      }}
      numberOfMonths={columnsDisplayed}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

interface MonthGridProps {
  className?: string;
  currentMonth: Date;
  startMonth?: Date;
  endMonth?: Date;
  onSelect: (date: Date) => void;
}

function MonthGrid({
  currentMonth,
  startMonth,
  endMonth,
  onSelect,
}: MonthGridProps) {
  const currentEthDate = toEth(currentMonth);

  return (
    <div className="grid grid-cols-3 gap-y-2 pt-4">
      {ethMonths.map((name, i) => {
        const monthIndex = i + 1;
        const currentDate = toGreg({
          Year: currentEthDate.Year,
          Month: monthIndex,
          Day: 1,
        });

        const isBefore = startMonth && currentDate < startMonth;
        const isAfter = endMonth && currentDate > endMonth;
        const isDisabled = isBefore || isAfter;

        return (
          <Button
            key={monthIndex}
            className={cn(
              "h-7 w-full text-sm font-normal text-foreground",
              monthIndex === currentEthDate.Month &&
                "bg-accent font-medium text-accent-foreground"
            )}
            variant="ghost"
            onClick={() => onSelect(currentDate)}
            disabled={isDisabled}
          >
            {name}
          </Button>
        );
      })}
    </div>
  );
}

interface YearGridProps {
  className?: string;
  currentMonth: Date;
  displayYears: { from: number; to: number };
  startMonth?: Date;
  endMonth?: Date;
  onSelect: (date: Date) => void;
}

function YearGrid({
  currentMonth,
  displayYears,
  startMonth,
  endMonth,
  onSelect,
}: YearGridProps) {
  const currentEthDate = toEth(currentMonth);
  const yearRange = displayYears.to - displayYears.from + 1;
  const years = Array.from(
    { length: yearRange },
    (_, i) => displayYears.from + i
  );

  return (
    <div className="grid grid-cols-4 gap-y-2 pt-4">
      {years.map((year) => {
        const currentDate = toGreg({
          Year: year,
          Month: currentEthDate.Month,
          Day: 1,
        });

        const isBefore =
          startMonth &&
          differenceInCalendarDays(new Date(year, 11, 31), startMonth) < 0;

        const isAfter =
          endMonth &&
          differenceInCalendarDays(new Date(year, 0, 0), endMonth) > 0;

        const isDisabled = isBefore || isAfter;
        return (
          <Button
            key={year}
            className={cn(
              "h-7 w-full text-sm font-normal text-foreground",
              year === currentEthDate.Year &&
                "bg-accent font-medium text-accent-foreground"
            )}
            variant="ghost"
            onClick={() => onSelect(currentDate)}
            disabled={isDisabled}
          >
            {year}
          </Button>
        );
      })}
    </div>
  );
}
