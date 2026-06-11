export const formatPrice = (price: number, currencyLabel = "Tk") =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("BDT", currencyLabel);
