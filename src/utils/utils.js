export const timestampFormatter = (unixTimestamp) => {
  const timeInMillis = unixTimestamp * 1000;
  const date = new Date(timeInMillis);
  const month = date.toLocaleString("es-en", { month: "short" }) + ".";
  return date.getDate() + " " + month;
};
