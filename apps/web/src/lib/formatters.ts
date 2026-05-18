type YearRangeInput = {
  yearFrom: number | null;
  yearTo: number | null;
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatYearRange(
  value: YearRangeInput,
  unspecifiedYears: string
) {
  if (!value.yearFrom && !value.yearTo) {
    return unspecifiedYears;
  }

  if (value.yearFrom && !value.yearTo) {
    return `${value.yearFrom}+`;
  }

  return `${value.yearFrom ?? ""} - ${value.yearTo ?? ""}`;
}