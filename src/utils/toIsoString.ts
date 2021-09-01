export const toIsoString = (date: Date) => {
  return (new Date(date).toISOString().substring(0,10));
}

export const getXdaysfromToday = (pastDays: number) => {
  const date = new Date();
  const oldDate = date.getDate() - pastDays;
  const  oldDateNUmber = date.setDate(oldDate);

  return toIsoString(new Date(oldDateNUmber));
}
