export function compactFormat(value: number) {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  });

  return formatter.format(value);
}

export function standardFormat(value: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatVND(value: number) {
  // Format as Vietnamese đồng without decimal places, e.g. "16.000 ₫"
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(value);
  } catch (e) {
    // Fallback: simple grouping with no decimals + ₫
    return `${Math.round(value).toLocaleString()} ₫`;
  }
}