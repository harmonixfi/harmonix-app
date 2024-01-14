export const toCompactNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(value);
};
