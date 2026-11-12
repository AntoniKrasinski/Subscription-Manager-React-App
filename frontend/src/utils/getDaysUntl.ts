const parseDate = (date: string) => {
  return new Date(date);
};

export const getDaysUntil = (date: string | null) => {
  if (date === null) {
    return null;
  }

  const currentDate = new Date();

  const differenceInSec = parseDate(date).getTime() - currentDate.getTime();

  const differenceInDays = Math.ceil(differenceInSec / (1000 * 60 * 60 * 24));

  // Perfect feedback does not really matter at this point, so I kept it as simple as possible.

  if (differenceInDays > 60) {
    const differenceInMonths = Math.floor(differenceInDays / 30);
    return `Next payment in ${differenceInMonths} months`;
  } else if (differenceInDays > 14) {
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    return `Next payment in ${differenceInWeeks} weeks`;
  } else {
    return `Next payment in ${differenceInDays} ${differenceInDays === 1 ? "day" : "days"} `;
  }
};
