import { differenceInDays, differenceInHours, set } from "date-fns";

export const sameDueDateTime = (dueDate, dueTime) => {
  const date = new Date(dueDate);
  const time = new Date(dueTime);

  const newDueTime = set(time, {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  });

  return newDueTime;
};

export const getTimeLeft = (dueTime) => {
  const now = new Date();
  const dueDate = new Date(dueTime);

  const totalHoursLeft = differenceInHours(dueDate, now);
  const daysLeft = differenceInDays(dueDate, now);
  const hoursLeft = totalHoursLeft % 24;

  if (daysLeft < 0 || hoursLeft < 0) {
    return `Exceeds deadline`;
  } else if (daysLeft === 0) {
    return `${hoursLeft} hours`;
  } else {
    return `${daysLeft} days ${hoursLeft} hours`;
  }
};
