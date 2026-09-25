const parseDate = (date: string) => {
  return new Date(date);
};

export const getDaysUntil = (date: string | null) => {
  if (date === null) {
    return null;
  }
  const currentDate = new Date();

  const diffrenceInSec = parseDate(date).getTime() - currentDate.getTime();

  const diffrenceInDays = Math.ceil(diffrenceInSec / (1000 * 60 * 60 * 24));


  return `Next paymant in ${diffrenceInDays} ${diffrenceInDays === 1 ? "day" : "days"} `;
};
