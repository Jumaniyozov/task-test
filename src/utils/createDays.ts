import { format } from "date-fns";

interface Day {
  key: string | number;
  date: number;
  day: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  compare: string;
}

export const renderCalendar = (
  currYear: number,
  currMonth: number,
  date: Date
): Day[] => {
  const days: Day[] = [];

  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(), // getting last date of previous month
    lastMonth = new Date(currYear, currMonth, 0).getMonth(); // getting last date of previous month

  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    const day = lastDateofLastMonth - i + 1;
    const currDate = new Date(currYear, lastMonth, day);
    days.push({
      key: `previous ${day}`,
      date: date.getTime(),
      day: day,
      isCurrentMonth: false,
      isToday: false,
      compare: format(currDate, "MM/dd/yyyy"),
    });
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear();
    const currDate = new Date(currYear, currMonth, i);

    days.push({
      key: i,
      date: new Date(currYear, currMonth, i).getTime(),
      day: i,
      isCurrentMonth: true,
      isToday: isToday,
      compare: format(currDate, "MM/dd/yyyy"),
    });
  }

  for (let i = lastDayofMonth; days.length < 42; i++) {
    // creating li of next month first days
    const day = i - lastDayofMonth + 1;
    const currDate = new Date(currYear, currMonth + 1, day);

    days.push({
      key: `next ${day}`,
      date: new Date(currYear, currMonth + 1, day).getTime(),
      day: day,
      isCurrentMonth: false,
      isToday: false,
      compare: format(currDate, "MM/dd/yyyy"),
    });
  }

  return days;
};
