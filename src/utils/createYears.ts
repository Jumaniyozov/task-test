import { format } from "date-fns";

export const createYears = () => {
  let years = [];

  for (let i = 1971; i <= 2100; i++) {
    years.push({ id: i, val: i });
  }

  return years;
};

function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber);

  return date.toLocaleString("en-US", { month: "long" });
}

export const createMonths = () => {
  let months = [];
  for (let i = 0; i < 12; i++) {
    months.push({ id: getMonthName(i), val: i });
  }

  return months;
};
