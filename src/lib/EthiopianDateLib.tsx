import { DateArg, format, FormatOptions } from "date-fns";
import { enUS } from "date-fns/locale";
import { DateLib, type DateLibOptions } from "react-day-picker";

import {
  addYears as addEtYears,
  ethiopianMonthLength,
  formatEthiopianDate,
  isLeapYearEt,
  toEth,
  toGreg,
} from "./EthiopianDateUtils";

export class EthiopianDateLib extends DateLib {
  constructor(options?: DateLibOptions) {
    super({ ...options, weekStartsOn: 1 });
  }

  private ensureDate(date: string | number | Date): Date {
    return date instanceof Date ? date : new Date(date);
  }

  override format = (
    date: string | number | Date,
    formatStr: string,
    options?: FormatOptions
  ): string => {
    const dateObj = this.ensureDate(date);

    // Handle time formats using original date-fns format
    if (formatStr.includes("hh:mm") || formatStr.includes("a")) {
      return format(dateObj, formatStr, { ...this.options, ...options });
    }

    return formatEthiopianDate(dateObj, formatStr);
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

    // Get the first day of the current year
    const firstDayOfYear = toGreg({
      Year: etDate.Year,
      Month: 1,
      Day: 1,
    });

    // Get the first day of next year
    const firstDayOfNextYear = toGreg({
      Year: etDate.Year + 1,
      Month: 1,
      Day: 1,
    });

    // Adjust to the start of the week (Monday)
    const getWeekStart = (date: Date) => {
      const daysSinceMonday = (date.getDay() + 6) % 7;
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - daysSinceMonday);
      return weekStart;
    };

    const firstWeekStart = getWeekStart(firstDayOfYear);
    const nextYearFirstWeekStart = getWeekStart(firstDayOfNextYear);

    // If the date is in the last week of the year, check if it belongs to week 1 of next year
    if (dateObj >= nextYearFirstWeekStart) {
      return 1;
    }

    // Calculate days since the first week start
    const daysSinceStart = Math.floor(
      (dateObj.getTime() - firstWeekStart.getTime()) / (24 * 60 * 60 * 1000)
    );

    // If the date is before the first week of its year, it belongs to the last week of previous year
    if (dateObj < firstWeekStart) {
      const prevYearFirstDay = toGreg({
        Year: etDate.Year - 1,
        Month: 1,
        Day: 1,
      });
      const prevYearFirstWeekStart = getWeekStart(prevYearFirstDay);
      const daysSincePrevStart = Math.floor(
        (dateObj.getTime() - prevYearFirstWeekStart.getTime()) /
          (24 * 60 * 60 * 1000)
      );
      return Math.floor(daysSincePrevStart / 7) + 1;
    }

    const data = Math.floor(daysSinceStart / 7) + 1;
    return data;
  };

  // Override addMonths to handle Ethiopian calendar
  addMonths = <DateType extends Date, ResultDate extends Date = DateType>(
    date: DateArg<DateType>,
    amount: number
  ): ResultDate => {
    const dateObj = this.ensureDate(date);
    let etDate = toEth(dateObj);
    let newMonth = etDate.Month + amount;
    const yearAdjustment = Math.floor((newMonth - 1) / 13);
    newMonth = ((newMonth - 1) % 13) + 1;

    if (newMonth < 1) {
      newMonth += 13;
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
