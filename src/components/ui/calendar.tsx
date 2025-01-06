"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EthiopianDateLib } from "@/lib/EthiopianDateLib";
import {
  ethiopianDayDiff,
  ethMonths,
  toEth,
  toGreg,
} from "@/lib/EthiopianDateUtils";
import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  subMonths,
  subYears,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  labelNext,
  labelPrevious,
  useDayPicker,
  type DayPickerProps,
} from "react-day-picker";

export type CalendarProps = DayPickerProps & {
  /**
   * In the year view, the number of years to display at once.
   * @default 16
   */
  yearRange?: number;

  /**
   * Wether to show the year switcher in the caption.
   * @default true
   */
  showYearSwitcher?: boolean;
  defaultDateLib?: "Ethiopian" | "Gregorian";
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
  showYearSwitcher = true,
  yearRange = 16,
  numberOfMonths,
  defaultDateLib = "Ethiopian",
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
      const currentYear =
        defaultDateLib === "Ethiopian"
          ? toEth(new Date()).Year
          : new Date().getFullYear();
      return {
        from: currentYear - Math.floor(yearRange / 2 - 1),
        to: currentYear + Math.ceil(yearRange / 2),
      };
    }, [defaultDateLib, yearRange])
  );

  const { onNextClick, onPrevClick, startMonth, endMonth } = props;

  console.log("startMonth", startMonth);
  console.log("endMonth", endMonth);

  const columnsDisplayed = navView === "years" ? 1 : numberOfMonths;

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
      dateLib={
        defaultDateLib === "Ethiopian" ? new EthiopianDateLib() : undefined
      }
      ISOWeek={false}
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
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        Nav: ({ className, ...props }) => {
          const { nextMonth, previousMonth, goToMonth } = useDayPicker();
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
            return !nextMonth;
          })();

          const handlePreviousClick = React.useCallback(() => {
            if (!previousMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from - (prev.to - prev.from + 1),
                to: prev.to - (prev.to - prev.from + 1),
              }));
              onPrevClick?.(
                new Date(
                  displayYears.from - (displayYears.to - displayYears.from),
                  0,
                  1
                )
              );
              return;
            }
            if (navView === "months") {
              goToMonth(subYears(addMonths(previousMonth, 1), 1));
              onPrevClick?.(previousMonth);
              return;
            }
            goToMonth(previousMonth);
            onPrevClick?.(previousMonth);
          }, [previousMonth, goToMonth]);

          const handleNextClick = React.useCallback(() => {
            if (!nextMonth) return;
            if (navView === "years") {
              setDisplayYears((prev) => ({
                from: prev.from + (prev.to - prev.from + 1),
                to: prev.to + (prev.to - prev.from + 1),
              }));
              onNextClick?.(
                new Date(
                  displayYears.from + (displayYears.to - displayYears.from),
                  0,
                  1
                )
              );

              return;
            }
            if (navView === "months") {
              goToMonth(addYears(subMonths(nextMonth, 1), 1));
              onNextClick?.(nextMonth);
              return;
            }
            goToMonth(nextMonth);
            onNextClick?.(nextMonth);
          }, [goToMonth, nextMonth]);
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
                    : labelPrevious(previousMonth)
                }
                onClick={handlePreviousClick}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="absolute right-0 h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
                type="button"
                tabIndex={isNextDisabled ? undefined : -1}
                disabled={isNextDisabled}
                aria-label={
                  navView === "years"
                    ? `Go to the next ${
                        displayYears.to - displayYears.from + 1
                      } years`
                    : labelNext(nextMonth)
                }
                onClick={handleNextClick}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          );
        },
        CaptionLabel: ({ children, ...props }) => {
          if (!showYearSwitcher) return <span {...props}>{children}</span>;

          const date = children?.toString().split(" ");
          const month = date?.[0];
          const year = date?.[1];

          return (
            <div className="flex items-center">
              {navView === "days" && (
                <Button
                  className=" truncate text-sm font-medium w-full pr-2 hover:border-r-none"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setNavView((prev) =>
                      prev === "months" ? "days" : "months"
                    )
                  }
                >
                  {month}
                </Button>
              )}

              <Button
                className="truncate text-sm font-medium  w-full pl-2 hover:border-l-none"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setNavView((prev) => (prev === "years" ? "days" : "years"))
                }
              >
                {navView === "years"
                  ? `${displayYears.from} - ${displayYears.to}`
                  : year}
              </Button>
            </div>
          );
        },
        MonthGrid: ({ className, children, ...props }) => {
          if (navView === "months") {
            return (
              <MonthGridView
                className={className}
                {...props}
                navView={navView}
                setNavView={setNavView}
                startMonth={startMonth!}
                endMonth={endMonth!}
                defaultDateLib={defaultDateLib}
              />
            );
          }
          if (navView === "years") {
            return (
              <YearGridView
                className={className}
                {...props}
                displayYears={displayYears}
                navView={navView}
                setNavView={setNavView}
                startMonth={startMonth!}
                endMonth={endMonth!}
                defaultDateLib={defaultDateLib}
              />
            );
          }
          return (
            <table className={className} {...props}>
              {children}
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

interface GridViewProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  navView: "days" | "months" | "years";
  setNavView: (view: "days" | "months" | "years") => void;
  defaultDateLib: "Ethiopian" | "Gregorian";
  startMonth: Date;
  endMonth: Date;
}

function MonthGridView({
  className,
  setNavView,
  startMonth,
  endMonth,
  defaultDateLib,
  ...props
}: GridViewProps) {
  const { goToMonth, months: calendarMonths } = useDayPicker();
  const currentMonth = calendarMonths[0].date;

  const currentEth = toEth(currentMonth);
  const isEthiopian = defaultDateLib === "Ethiopian";
  const months = isEthiopian
    ? ethMonths
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

  return (
    <div className={cn("grid grid-cols-3 gap-2", className)} {...props}>
      {months.map((month, index) => {
        const monthGreg = isEthiopian
          ? toGreg({
              Month: index + 1,
              Year: currentEth.Year,
              Day: currentEth.Day,
            })
          : new Date(currentMonth.getFullYear(), index, 1);

        const isBefore = differenceInCalendarDays(monthGreg, startMonth) < 0;
        const isAfter = differenceInCalendarDays(monthGreg, endMonth) > 0;
        const isDisabled = isBefore || isAfter;
        return (
          <Button
            key={month}
            className="h-7 w-full text-sm font-normal"
            variant="ghost"
            disabled={isDisabled}
            onClick={() => {
              goToMonth(
                isEthiopian
                  ? toGreg({
                      Month: index + 1,
                      Year: currentEth.Year,
                      Day: currentEth.Day,
                    })
                  : new Date(currentMonth.getFullYear(), index, 1)
              );
              setNavView("days");
            }}
          >
            {month}
          </Button>
        );
      })}
    </div>
  );
}

function YearGridView({
  className,
  setNavView,
  displayYears,
  navView,
  startMonth,
  endMonth,
  defaultDateLib,
  ...props
}: GridViewProps & { displayYears: { from: number; to: number } }) {
  const { goToMonth } = useDayPicker();

  const isEthiopian = defaultDateLib === "Ethiopian";

  const currentYear = isEthiopian
    ? toEth(new Date()).Year
    : new Date().getFullYear();

  const todayEth = toEth(new Date());

  return (
    <div className={cn("grid grid-cols-4 gap-y-2", className)} {...props}>
      {Array.from(
        { length: displayYears.to - displayYears.from + 1 },
        (_, i) => {
          const isBefore = isEthiopian
            ? ethiopianDayDiff(
                {
                  Day: 1,
                  Month: 1,
                  Year: displayYears.from + i,
                },
                toEth(startMonth!)
              ) < 0
            : differenceInCalendarDays(
                new Date(displayYears.from + i, 11, 31),
                startMonth!
              ) < 0;

          const isAfter = isEthiopian
            ? ethiopianDayDiff(
                {
                  Day: 1,
                  Month: 1,
                  Year: displayYears.from + i,
                },
                toEth(endMonth!)
              ) > 0
            : differenceInCalendarDays(
                new Date(displayYears.from + i, 0, 0),
                endMonth!
              ) > 0;

          const isDisabled = isBefore || isAfter;
          return (
            <Button
              key={i}
              className={cn(
                "h-7 w-full text-sm font-normal text-foreground",
                displayYears.from + i === currentYear &&
                  "bg-accent font-medium text-accent-foreground"
              )}
              variant="ghost"
              onClick={() => {
                setNavView("days");
                goToMonth(
                  isEthiopian
                    ? toGreg({
                        Year: displayYears.from + i,
                        Month: todayEth.Month,
                        Day: todayEth.Day,
                      })
                    : new Date(displayYears.from + i, new Date().getMonth())
                );
              }}
              disabled={navView === "years" ? isDisabled : undefined}
            >
              {displayYears.from + i}
            </Button>
          );
        }
      )}
    </div>
  );
}

export { Calendar };
