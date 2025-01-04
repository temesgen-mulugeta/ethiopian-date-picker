import { CalendarDay, CalendarMonth, CalendarWeek } from "react-day-picker";
import { et } from "date-fns/locale";


export const getCalendarMonth = () => {
  const startDate = new Date("2024-12-10");
  const displayMonth = new Date("2024-12-01"); // The month we're primarily displaying

  const weeks: CalendarWeek[] = [];
  let currentWeek: CalendarDay[] = [];
  let currentDate = new Date(startDate);
  let weekNumber = getWeekNumber(startDate);

  // Generate days until January 8
  while (currentDate <= new Date("2025-01-08")) {
    currentWeek.push(new CalendarDay(new Date(currentDate), displayMonth));

    // If we've filled a week (7 days) or reached the end date
    if (currentWeek.length === 7) {
      weeks.push(new CalendarWeek(weekNumber, currentWeek));
      currentWeek = [];
      weekNumber++;
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Add any remaining days as the last week
  if (currentWeek.length > 0) {
    weeks.push(new CalendarWeek(weekNumber, currentWeek));
  }

  return new CalendarMonth(startDate, weeks);
};

// Helper function to get ISO week number
function getWeekNumber(date: Date): number {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
