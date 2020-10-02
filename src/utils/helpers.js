const truncateString = (str, count) => {
  if (str.length < count) return str;
  return `${str.slice(0, count + 1)}...`;
};

const errorHandler = error => {
  if (error.response) {
    if (error.response.status === 402) {
      return 'An error occured';
    }
    return error.response.data.message;
  } else if (error.request) {
    return error.request;
  } else if (error.message) {
    return error.message;
  } else {
    return error;
  }
};

export { truncateString, errorHandler };
