// Format price
export const formatPrice = (number: string, showNumber: boolean = false) => {
  const fnumber = parseFloat(number)
  if (fnumber === 0 && !showNumber) return "FREE"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fnumber)
}
