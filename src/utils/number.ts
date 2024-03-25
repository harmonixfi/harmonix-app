export const toCompactNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(value);
};

export const formatTokenAmount = (value: number, digit = 2) => value.toFixed(digit);

export const withCommas = (input: number | string = '') => {
  if (!input) return input;
  return String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
