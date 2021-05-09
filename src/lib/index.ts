// Format price
export const formatPrice = (number: string, showNumber = false) => {
  const fnumber = parseFloat(number);
  if (fnumber === 0 && !showNumber) return "FREE";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fnumber);
};

export const getSubtotal = (items: any[]) =>
  items.reduce((prev, item) => parseInt(item.price) + prev, 0);
