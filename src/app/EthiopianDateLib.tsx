import {
  DateArg,
  differenceInCalendarDays,
  EachMonthOfIntervalOptions,
  format,
  FormatOptions,
  Interval
} from "date-fns";
import { enUS } from "date-fns/locale";
import { DateLib, type DateLibOptions } from "react-day-picker";

import {
  addDays as addEtDays,
  addYears as addEtYears,
  ethiopianMonthLength,
  getEtDayName,
  getEtMonthName,
  isLeapYearEt,
  toEth,
  toGreg,
} from "./EthiopianDateUtils";

export class EthiopianDateLib extends DateLib {
  constructor(options?: DateLibOptions) {
    super(options);
  }

  private ensureDate(date: string | number | Date): Date {
    return date instanceof Date ? date : new Date(date);
  }

  // Override the format method to handle Ethiopian dates
  format = (
    date: string | number | Date,
    formatStr: string,
    options?: FormatOptions
  ): string => {
    const dateObj = this.ensureDate(date);
    const etDate = toEth(dateObj);

    if (formatStr === "LLLL yyyy") {
      return `${getEtMonthName(etDate.Month)} ${etDate.Year}`;
    }
    if (formatStr === "LLLL") {
      return getEtMonthName(etDate.Month);
    }
    if (formatStr === "yyyy-MM-dd") {
      return `${etDate.Year}-${etDate.Month.toString().padStart(
        2,
        "0"
      )}-${etDate.Day.toString().padStart(2, "0")}`;
    }
    if (formatStr === "yyyy-MM") {
      return `${etDate.Year}-${etDate.Month.toString().padStart(2, "0")}`;
    }
    if (formatStr === "d") {
      return etDate.Day.toString();
    }
    if (formatStr === "PPPP") {
      const dayName = getEtDayName(dateObj);
      const monthName = getEtMonthName(etDate.Month);
      return `${dayName}, ${monthName} ${etDate.Day}, ${etDate.Year}`;
    }
    if (formatStr === "LLLL y") {
      return `${getEtMonthName(etDate.Month)} ${etDate.Year}`;
    }
    if (formatStr === "cccc") {
      const dayName = getEtDayName(dateObj);
      return dayName;
    }
    if (formatStr === "cccccc") {
      const dayName = getEtDayName(dateObj);
      return dayName;
    }
    // For time formats, use the original date-fns format
    if (formatStr.includes("hh:mm") || formatStr.includes("a")) {
      return format(dateObj, formatStr, { ...this.options, ...options });
    }
    return `${etDate.Day}/${etDate.Month}/${etDate.Year}`;
  };

  // Override getMonth to return Ethiopian month (1-13)
  getMonth = (date: string | number | Date): number => {
    const dateObj = this.ensureDate(date);
    const etDate = toEth(dateObj);
    return etDate.Month - 1; // Convert to 0-based for compatibility
  };

  // Override getYear to return Ethiopian year
  getYear = (date: string | number | Date): number => {
    const dateObj = this.ensureDate(date);
    const etDate = toEth(dateObj);
    return etDate.Year;
  };

  // Override getWeek to return Ethiopian week number
  getWeek = (date: string | number | Date): number => {
    const dateObj = this.ensureDate(date);
    const etDate = toEth(dateObj);

    // Get the first day of the year
    const firstDayOfYear = toGreg({
      Year: etDate.Year,
      Month: 1,
      Day: 1,
    });

    // Calculate days since the start of the year
    const daysSinceYearStart = Math.floor(
      (dateObj.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)
    );

    // Get the day of week for the first day of the year (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDayOfYear.getDay();

    // Calculate the week number
    // Add 1 to make it 1-based, and add the first partial week if the year didn't start on Sunday
    return Math.floor((daysSinceYearStart + firstDayOfWeek) / 7) + 1;
  };

  // Override addMonths to handle Ethiopian calendar
  addMonths = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>,
    amount: number
  ): ResultDate => {
    const dateObj = this.ensureDate(date as string | number | Date);
    let etDate = toEth(dateObj);
    let newMonth = etDate.Month + amount;
    let yearAdjustment = Math.floor((newMonth - 1) / 13);
    newMonth = ((newMonth - 1) % 13) + 1;
    if (newMonth < 1) {
      newMonth += 13;
      yearAdjustment -= 1;
    }
    etDate = {
      ...etDate,
      Month: newMonth,
      Year: etDate.Year + yearAdjustment,
    };

    // Adjust day if it exceeds the month length
    const monthLength = ethiopianMonthLength(newMonth, etDate.Year);
    if (etDate.Day > monthLength) {
      etDate.Day = monthLength;
    }

    const data = toGreg(etDate) as ResultDate;

    return data;
  };
  differenceInCalendarDays: typeof differenceInCalendarDays = (
    dateLeft,
    dateRight
  ) => {
    const data = this.overrides?.differenceInCalendarDays
      ? this.overrides.differenceInCalendarDays(dateLeft, dateRight)
      : differenceInCalendarDays(dateLeft, dateRight);

    return data;
  };

  // ... existing code ...
  differenceInCalendarMonths = (
    dateLeft: string | number | Date,
    dateRight: string | number | Date
  ): number => {
    const date1 = this.ensureDate(dateLeft);
    const date2 = this.ensureDate(dateRight);
    const etDate1 = toEth(date1);
    const etDate2 = toEth(date2);
    const data =
      (etDate1.Year - etDate2.Year) * 13 + (etDate1.Month - etDate2.Month);
    console.log("difference in calendar months", dateLeft, dateRight, data);
    return data;
  };
  // ... existing code ...

  // Override addYears to handle Ethiopian calendar
  addYears = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>,
    amount: number
  ): ResultDate => {
    const dateObj = this.ensureDate(date as string | number | Date);
    const etDate = toEth(dateObj);
    const newDate = addEtYears(etDate, amount);
    return toGreg(newDate) as ResultDate;
  };

  // Override startOfMonth to handle Ethiopian calendar
  startOfMonth = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>
  ): ResultDate => {
    const dateObj = this.ensureDate(date as string | number | Date);
    const etDate = toEth(dateObj);

    const start = toGreg({
      ...etDate,
      Day: 1,
    }) as ResultDate;
    return start;
  };

  // Override endOfMonth to handle Ethiopian calendar
  endOfMonth = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>
  ): ResultDate => {
    const dateObj = this.ensureDate(date as string | number | Date);
    const etDate = toEth(dateObj);

    const end = toGreg({
      ...etDate,
      Day: ethiopianMonthLength(etDate.Month, etDate.Year),
    }) as ResultDate;
    return end;
  };

  // Override isSameMonth to handle Ethiopian calendar
  isSameMonth = (
    laterDate: string | number | Date,
    earlierDate: string | number | Date
  ): boolean => {
    const date1 = this.ensureDate(laterDate);
    const date2 = this.ensureDate(earlierDate);
    const etDate1 = toEth(date1);
    const etDate2 = toEth(date2);
    return etDate1.Year === etDate2.Year && etDate1.Month === etDate2.Month;
  };

  // Override isSameYear to handle Ethiopian calendar
  isSameYear = (
    laterDate: string | number | Date,
    earlierDate: string | number | Date
  ): boolean => {
    const date1 = this.ensureDate(laterDate);
    const date2 = this.ensureDate(earlierDate);
    const etDate1 = toEth(date1);
    const etDate2 = toEth(date2);
    return etDate1.Year === etDate2.Year;
  };

  // Override today to return current date in Ethiopian calendar
  today = (): Date => {
    const today = new Date();
    return today;
  };

  // Override isSameDay to handle Ethiopian calendar
  isSameDay = (
    laterDate: string | number | Date,
    earlierDate: string | number | Date
  ): boolean => {
    const date1 = this.ensureDate(laterDate);
    const date2 = this.ensureDate(earlierDate);
    const etDate1 = toEth(date1);
    const etDate2 = toEth(date2);
    return (
      etDate1.Year === etDate2.Year &&
      etDate1.Month === etDate2.Month &&
      etDate1.Day === etDate2.Day
    );
  };

  // Override eachMonthOfInterval to handle Ethiopian calendar
  eachMonthOfInterval = <
    IntervalType extends Interval,
    Options extends EachMonthOfIntervalOptions | undefined = undefined
  >(
    interval: IntervalType
  ): Array<
    Options extends EachMonthOfIntervalOptions<infer DateType>
      ? DateType
      : IntervalType["start"] extends Date
      ? IntervalType["start"]
      : IntervalType["end"] extends Date
      ? IntervalType["end"]
      : Date
  > => {
    const start = this.ensureDate(interval.start as Date);
    const end = this.ensureDate(interval.end as Date);
    const startEt = toEth(start);
    const endEt = toEth(end);
    const months: Date[] = [];

    let currentYear = startEt.Year;
    let currentMonth = startEt.Month;

    while (
      currentYear < endEt.Year ||
      (currentYear === endEt.Year && currentMonth <= endEt.Month)
    ) {
      months.push(toGreg({ Year: currentYear, Month: currentMonth, Day: 1 }));
      currentMonth++;
      if (currentMonth > 13) {
        currentMonth = 1;
        currentYear++;
      }
    }

    return months as Array<
      Options extends EachMonthOfIntervalOptions<infer DateType>
        ? DateType
        : IntervalType["start"] extends Date
        ? IntervalType["start"]
        : IntervalType["end"] extends Date
        ? IntervalType["end"]
        : Date
    >;
  };

  // Override endOfYear to handle Ethiopian calendar
  endOfYear = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>
  ): ResultDate => {
    const dateObj = this.ensureDate(date as Date);
    const etDate = toEth(dateObj);
    return toGreg({
      Year: etDate.Year,
      Month: 13,
      Day: isLeapYearEt(etDate.Year) ? 6 : 5,
    }) as ResultDate;
  };

  // Override setMonth to handle Ethiopian calendar
  setMonth = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>,
    month: number
  ): ResultDate => {
    const dateObj = this.ensureDate(date as Date);
    const etDate = toEth(dateObj);
    // Adjust month to 1-based index since Ethiopian calendar uses 1-13
    const targetMonth = month + 1;

    if (targetMonth < 1 || targetMonth > 13) {
      throw new Error(
        "Month must be between 0 and 12 (1-13 in Ethiopian calendar)"
      );
    }

    // Adjust day if it exceeds the month length
    const monthLength = ethiopianMonthLength(targetMonth, etDate.Year);
    const newDay = Math.min(etDate.Day, monthLength);

    return toGreg({
      ...etDate,
      Month: targetMonth,
      Day: newDay,
    }) as ResultDate;
  };

  // Override startOfYear to handle Ethiopian calendar
  startOfYear = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>
  ): ResultDate => {
    const dateObj = this.ensureDate(date as Date);
    const etDate = toEth(dateObj);
    return toGreg({
      Year: etDate.Year,
      Month: 1,
      Day: 1,
    }) as ResultDate;
  };
}

// Create a default instance
export const ethiopianDateLib = new EthiopianDateLib({
  locale: {
    ...enUS,
    formatLong: {
      date: () => "MM/dd/yyyy",
      time: () => "HH:mm:ss",
      dateTime: () => "MM/dd/yyyy HH:mm:ss",
    },
  },
});
