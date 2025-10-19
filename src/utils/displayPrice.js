export function displayPrice(priceType, price) {
  switch (priceType) {
    case "free":
      return "Free";
    case "pay-as-you-feel":
      return "Pay What You Feel";
    case "fixed":
      return `£${Number(price).toFixed(2)}`;
    default:
      return "-";
  }
}
