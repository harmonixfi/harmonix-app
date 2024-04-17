export const toCompactNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(value);
};

export const toFixedNumber = (value: number, digit = 2) => value.toFixed(digit);

export const withCommas = (input: number | string = '') => {
  if (!input) return input;
  return String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPnl = (pnl: number | string, isPercent = false) => {
  const percent = isPercent ? '%' : '';
  if (Number(pnl) < 0) return `${withCommas(pnl)}${percent}`;
  if (Number(pnl) === 0) return `0${percent}`;
  return `+${withCommas(pnl)}${percent}`;
};

export const minDigits = (value: number, digits = 2) => {
  return ('0' + value).slice(-digits);
};
