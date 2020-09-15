const truncateString = (str, count) => {
  if (str.length < count) return str;
  return `${str.slice(0, count + 1)}...`;
};

export { truncateString };
