
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatNumberPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const unformatPriceBase = (formattedPrice: string) => {
  if (!formattedPrice) return 0;
  let numeric = formattedPrice.replace(/[^0-9,-]+/g, "");
  numeric = numeric.replace(/\./g, "");
  numeric = numeric.replace(",", ".");
  const result = parseFloat(numeric);
  return isNaN(result) ? 0 : result;
};

export const formatTime = (dateStr: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(new Date(dateStr))
    .replace(/\./g, ":");
};