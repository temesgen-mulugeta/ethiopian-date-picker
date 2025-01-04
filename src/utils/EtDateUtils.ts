export interface EtDate {
  Day: number;
  Month: number;
  Year: number;
}

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

export const shortDays = ["ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ", "እ"];

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

function getDayNoEthiopian(etDate: EtDate): number {
  const num = Math.floor(etDate.Year / 4);
  const num2 = etDate.Year % 4;
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

function grigorianDateFromDayNo(dayNum: number): Date {
  let year = 1,
    month = 1,
    day;

  const num400 = Math.floor(dayNum / 146097); // number of full 400-year periods
  dayNum %= 146097;
  if (dayNum === 0) {
    return new Date(400 * num400, 12 - 1, 31);
  }

  const num100 = Math.min(Math.floor(dayNum / 36524), 3); // number of full 100-year periods, but not more than 3
  dayNum -= num100 * 36524;
  if (dayNum === 0) {
    return new Date(400 * num400 + 100 * num100, 12 - 1, 31);
  }

  const num4 = Math.floor(dayNum / 1461); // number of full 4-year periods
  dayNum %= 1461;
  if (dayNum === 0) {
    return new Date(400 * num400 + 100 * num100 + 4 * num4, 12 - 1, 31);
  }

  const num1 = Math.min(Math.floor(dayNum / 365), 3); // number of full years, but not more than 3
  dayNum -= num1 * 365;
  if (dayNum === 0) {
    return new Date(400 * num400 + 100 * num100 + 4 * num4 + num1, 12 - 1, 31);
  }

  year += 400 * num400 + 100 * num100 + 4 * num4 + num1;

  while (true) {
    const daysInMonth = grigorianMonthLength(month, year);

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

function createEthiopianDate(dn: number): EtDate {
  const num = Math.floor(dn / 1461);
  const num2 = dn % 1461;
  const num3 = Math.floor(num2 / 365);
  const num4 = num2 % 365;
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

function getDayNoGrigorian(date: Date): number {
  if (!(date instanceof Date)) {
    console.error("Invalid date object:", date);
    return 0;
  }

  const years = date.getFullYear() - 1;
  const leap_years =
    Math.floor(years / 4) - Math.floor(years / 100) + Math.floor(years / 400);
  const non_leap_years = years - leap_years;
  const days_in_previous_years = leap_years * 366 + non_leap_years * 365;
  const days_in_current_year =
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

export function getEtMonthName(m: number): string {
  if (m > 0 && m <= 13) {
    return ethMonths[m - 1];
  }
  return "";
}

function isValid(date: EtDate): boolean {
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

  const newYear = etDate.Year + years;

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
