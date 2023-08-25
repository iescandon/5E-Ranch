const formatAmountForDisplay = (amount, currency) => {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(amount / 100);
};

export default formatAmountForDisplay;
