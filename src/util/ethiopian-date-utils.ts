/* eslint-disable @typescript-eslint/no-namespace */
import { format } from "date-fns";

export type DateType = "EN" | "AMH" | "AO" | "CUSTOM";

// export type EtLocal = "AMH" | "AO" | "CUSTOM";

export namespace EthiopianDate {
  export const shortDays = ["ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ", "እ"];
  export const englishShortDays = ["M", "T", "W", "T", "F", "S", "S"];
  export const longDays = ["ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "እሁድ"];
  export const ethMonths = [
    "መስከረም",
    "ጥቅምት",
    "ህዳር",
    "ታህሳስ",
    "ጥር",
    "የካቲት",
    "መጋቢት",
    "ሚያዚያ",
    "ግንቦት",
    "ሰኔ",
    "ሐምሌ",
    "ነሀሴ",
    "ጳጉሜ",
  ];
  export const AoMonths = [
    "Fulbaana",
    "Onkololeessa",
    "Sadaasa",
    "Muddee",
    "Amajji",
    "Guraadhanala",
    "Bitootesa",
    "Ebla",
    "Caamsaa",
    "Waxabajji",
    "Adoolessa",
    "Hagayya",
    "Qaammee",
  ];

  export interface EtDate {
    Day: number;
    Month: number;
    Year: number;
  }

  export function createEthiopianDateFromParts(
    d: number,
    m: number,
    y: number
  ): EtDate {
    return {
      Day: d,
      Month: m,
      Year: y,
    };
  }
  export function isLeapYearEt(y: number): boolean {
    return y % 4 === 3;
  }

  export function ethiopianMonthLength(m: number, y: number): number {
    if (m === 13) {
      return isLeapYearEt(y) ? 6 : 5;
    }
    return 30;
  }
  function isLeapYearGr(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  export function getDayNoEthiopian(etDate: EtDate): number {
    let num = Math.floor(etDate.Year / 4);
    let num2 = etDate.Year % 4;
    return num * 1461 + num2 * 365 + (etDate.Month - 1) * 30 + etDate.Day - 1;
  }

  function grigorianMonthLength(index: number, year: number): number {
    switch (index) {
      case 1: // January
      case 3: // March
      case 5: // May
      case 7: // July
      case 8: // August
      case 10: // October
      case 12: // December
        return 31;

      case 2: // February
        return isLeapYearGr(year) ? 29 : 28;
    }
    return 30; // April, June, September, November
  }

  export function getEtDayName(day: Date): string {
    const dayOfWeek = day.getDay();
    // Convert Sunday (0) to 7 to match Ethiopian calendar order
    const ethiopianDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return shortDays[ethiopianDayIndex];
  }

  export function getEtMonthStartDate(Month: number, Year: number): number {
    const grDate = toGreg({ Day: 1, Month, Year });
    return ((grDate.getUTCDay() || 7) % 7) + 1;
  }

  export function grigorianDateFromDayNo(dayNum: number): Date {
    let year = 1,
      month = 1,
      day;

    let num400 = Math.floor(dayNum / 146097); // number of full 400-year periods
    dayNum %= 146097;
    if (dayNum === 0) {
      return new Date(400 * num400, 12 - 1, 31);
    }

    let num100 = Math.min(Math.floor(dayNum / 36524), 3); // number of full 100-year periods, but not more than 3
    dayNum -= num100 * 36524;
    if (dayNum === 0) {
      return new Date(400 * num400 + 100 * num100, 12 - 1, 31);
    }

    let num4 = Math.floor(dayNum / 1461); // number of full 4-year periods
    dayNum %= 1461;
    if (dayNum === 0) {
      return new Date(400 * num400 + 100 * num100 + 4 * num4, 12 - 1, 31);
    }

    let num1 = Math.min(Math.floor(dayNum / 365), 3); // number of full years, but not more than 3
    dayNum -= num1 * 365;
    if (dayNum === 0) {
      return new Date(
        400 * num400 + 100 * num100 + 4 * num4 + num1,
        12 - 1,
        31
      );
    }

    year += 400 * num400 + 100 * num100 + 4 * num4 + num1;

    while (true) {
      let daysInMonth = grigorianMonthLength(month, year);

      if (dayNum <= daysInMonth) {
        day = dayNum;
        break;
      }

      dayNum -= daysInMonth;
      month++;
    }

    // Remember in JavaScript Date object, months are 0-based.
    return new Date(year, month - 1, day);
  }
  export function createEthiopianDate(dn: number): EtDate {
    let num: number;
    let num2: number;
    let num3: number;
    let num4: number;

    num = Math.floor(dn / 1461);
    num2 = dn % 1461;
    num3 = Math.floor(num2 / 365);
    num4 = num2 % 365;
    if (num2 !== 1460) {
      return {
        Year: num * 4 + num3,
        Month: Math.floor(num4 / 30) + 1,
        Day: (num4 % 30) + 1,
      };
    } else {
      return {
        Year: num * 4 + num3 - 1,
        Month: 13,
        Day: 6,
      };
    }
  }
  function addGregorianMonths(m: number, y: number): number {
    let sum = 0;
    for (let i = 1; i < m; i++) {
      sum += grigorianMonthLength(i, y);
    }
    return sum;
  }

  export function getDayNoGrigorian(date: Date): number {
    if (!(date instanceof Date)) {
      console.error("Invalid date object:", date);
      return 0;
    }

    let years = date.getFullYear() - 1;

    let leap_years =
      Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400);
    let non_leap_years = years - leap_years;
    let days_in_previous_years = leap_years * 366 + non_leap_years * 365;

    let days_in_current_year =
      addGregorianMonths(date.getMonth() + 1, date.getFullYear()) +
      date.getDate();
    return days_in_previous_years + days_in_current_year;
  }

  export function toEth(dt: Date): EtDate {
    return createEthiopianDate(getDayNoGrigorian(dt) - 2431);
  }

  export function toGreg(et: EtDate): Date {
    return grigorianDateFromDayNo(getDayNoEthiopian(et) + 2431);
  }

  export function formatEtDate(
    dt: EtDate,
    locale: DateType,
    getLocalMonth?: (month: number) => string,
    time?: number
  ) {
    let month = "";
    switch (locale) {
      case "AMH":
        month = getEtMonthName(dt.Month);
        break;
      case "AO":
        month = getEtMonthName(dt.Month, "AO");
        break;
      case "CUSTOM":
        month = getLocalMonth?.(dt.Month) ?? "";
        break;
      default:
        break;
    }
    return time
      ? `${month} ${dt.Day}/${dt.Year}  ${format(
          new Date(time - 6 * 60 * 60 * 1000),
          "hh:mm a"
        )}`
      : `${month} ${dt.Day}/${dt.Year}`;
  }

  export function formatGrDateToEtDate(date: Date) {
    const dt = toEth(date);
    return `${getEtMonthName(dt.Month)} ${dt.Day}/${dt.Year}`;
  }

  export function getEtMonthName(
    m: number,
    locale: DateType = "AMH",
    getLocalMonth?: (month: number) => string
  ): string {
    if (m > 0 && m <= 13) {
      switch (locale) {
        case "AMH":
          return ethMonths[m - 1];
        case "AO":
          return AoMonths[m - 1];
        case "CUSTOM":
          return getLocalMonth?.(m) ?? "";
        default:
          return ethMonths[m - 1];
      }
    }
    return "";
  }

  export function getDayOfWeekNameEt(d: number): string {
    switch (d) {
      case 1:
        return "ሰኞ";
      case 2:
        return "ማክሰኞ";
      case 3:
        return "ረቡዕ";
      case 4:
        return "ሀሙስ";
      case 5:
        return "አርብ";
      case 6:
        return "ቅዳሜ";
      case 7:
        return "እሁድ";
      default:
        return "";
    }
  }
  export function toNamedMonthStringFromEtDate(et: EtDate): string {
    return `${getEtMonthName(et.Month)} ${et.Day}, ${et.Year}`;
  }

  export function isValid(date: EtDate): boolean {
    if (date.Year < 1000 || date.Year > 3000) return false;
    if (date.Month < 1) return false;
    if (date.Day < 1) return false;
    if (date.Month > 13) return false;
    if (date.Day > ethiopianMonthLength(date.Month, date.Year)) return false;
    return true;
  }
  export function addYears(etDate: EtDate, years: number): EtDate {
    if (!isValid(etDate))
      throw new Error(
        `Invalid ethiopian date ${etDate.Day}-${etDate.Month}-${etDate.Year}`
      );

    let newYear = etDate.Year + years;

    if (etDate.Month === 13 && etDate.Day === 6) {
      if (!isLeapYearEt(newYear)) {
        return { Day: 5, Month: etDate.Month, Year: newYear };
      }
    }

    return { Day: etDate.Day, Month: etDate.Month, Year: newYear };
  }

  export function addDays(etDate: EtDate, days: number): EtDate {
    if (!isValid(etDate))
      throw new Error(
        `Invalid ethiopian date ${etDate.Day}-${etDate.Month}-${etDate.Year}`
      );

    return createEthiopianDate(getDayNoEthiopian(etDate) + 1 + days);
  }
  export function ethiopianYearDifference(
    d1: Date,
    d2: Date,
    upperBoundInclusive: boolean
  ): number {
    let date1 = toEth(d1);
    let date2 = toEth(d2);

    if (upperBoundInclusive) {
      date2 = addDays(date2, 1);
    }

    let dayNo1 = date1.Month * 30 + date1.Day;
    let dayNo2 = date2.Month * 30 + date2.Day;

    let years = date2.Year - date1.Year - (dayNo2 >= dayNo1 ? 0 : 1);
    years += (dayNo2 - dayNo1) / 365.0;

    return years;
  }

  export function fullEthiopianYearDifference(
    d1: Date,
    d2: Date,
    upperBoundInclusive: boolean
  ): { years: number; remainder: number } {
    let date1 = toEth(d1);
    let date2 = toEth(d2);

    if (upperBoundInclusive) {
      date2 = addDays(date2, 1);
    }

    let dayNo1 = date1.Month * 30 + date1.Day;
    let dayNo2 = date2.Month * 30 + date2.Day;

    let years = date2.Year - date1.Year - (dayNo2 >= dayNo1 ? 0 : 1);
    let remainder = dayNo2 - dayNo1;

    return { years, remainder };
  }
  // -1 if the first date is earlier than the second date
  // 0 if the two dates are the same
  // 1 if the first date is later than the second date
  export function compareDates(date1: EtDate, date2: EtDate): number {
    if (date1.Year < date2.Year) return -1;
    if (date1.Year > date2.Year) return 1;

    if (date1.Month < date2.Month) return -1;
    if (date1.Month > date2.Month) return 1;

    if (date1.Day < date2.Day) return -1;
    if (date1.Day > date2.Day) return 1;

    return 0; // Dates are equal
  }
}
