export const formatAmountForDisplay = (amount, currency) => {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(amount / 100);
};

export const formatTime = (utcSeconds) => {
  let date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  const year = date.getFullYear().toString().slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};
