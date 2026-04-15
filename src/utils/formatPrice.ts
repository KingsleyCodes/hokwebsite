export const formatPrice = (price: string, item: { currencyCode: string }) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: item.currencyCode || "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parseFloat(`${price}.00`));
};
