export const toCompactNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(value);
};

export const formatTokenAmount = (value: number, digit = 2) => value.toFixed(digit);
