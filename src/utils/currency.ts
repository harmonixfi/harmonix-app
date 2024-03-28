export const toCurrency = (value: number, digit = 0) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: digit,
  });
};
