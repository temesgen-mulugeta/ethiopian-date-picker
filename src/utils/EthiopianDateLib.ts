import { dateLib, DateLib, type DateLibOptions } from "react-day-picker";

import type {
  DateArg,
  EndOfWeekOptions,
  FormatOptions,
  StartOfWeekOptions,
} from "date-fns";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  addDays as addEtDays,
  addYears as addEtYears,
  ethiopianMonthLength,
  getEtDayName,
  getEtMonthName,
  toEth,
  toGreg,
} from "./EtDateUtils";

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

    return toGreg(etDate) as ResultDate;
  };

  startOfWeek: typeof startOfWeek = <
    DateType extends Date,
    ResultDate extends Date = DateType
  >(
    date: DateArg<DateType>
  ): ResultDate => {
    const firstOfMonth = this.startOfMonth(date);
    const dayOfWeek = firstOfMonth.getDay();

    if (dayOfWeek === 1) {
      return firstOfMonth;
    } else if (dayOfWeek === 0) {
      return dateLib.addDays(firstOfMonth, -1 * 6);
    } else {
      return this.addDays(firstOfMonth, -1 * (dayOfWeek - 1));
    }
  };

  endOfWeek: typeof endOfWeek = <
    DateType extends Date,
    ResultDate extends Date = DateType
  >(
    date: DateArg<DateType>
  ): ResultDate => {
    const data = this.overrides?.endOfWeek
      ? this.overrides.endOfWeek(
          date,
          this.options as EndOfWeekOptions<ResultDate>
        )
      : endOfWeek(date, this.options as EndOfWeekOptions<ResultDate>);

    return data;
  };

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

  // Override differenceInCalendarMonths to handle Ethiopian calendar
  differenceInCalendarMonths = (
    dateLeft: string | number | Date,
    dateRight: string | number | Date
  ): number => {
    const date1 = this.ensureDate(dateLeft);
    const date2 = this.ensureDate(dateRight);
    const etDate1 = toEth(date1);
    const etDate2 = toEth(date2);
    return (etDate1.Year - etDate2.Year) * 13 + (etDate1.Month - etDate2.Month);
  };

  // Override addDays to handle Ethiopian calendar
  addDays = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>,
    amount: number
  ): ResultDate => {
    const dateObj = this.ensureDate(date as string | number | Date);
    const etDate = toEth(dateObj);
    const newDate = addEtDays(etDate, amount);
    return toGreg(newDate) as ResultDate;
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
