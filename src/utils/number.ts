export const toCompactNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(value);
};

export const toFixedNumber = (value: number, digit = 2) => Number(value.toFixed(digit));

export const withCommas = (input: number | string = '') => {
  if (!input) return input;
  return String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPnl = (pnl: number, isPercent = false) => {
  const percent = isPercent ? '%' : '';
  if (pnl < 0) return `${pnl}${percent}`;
  if (pnl === 0) return `0${percent}`;
  return `+${pnl}${percent}`;
};
