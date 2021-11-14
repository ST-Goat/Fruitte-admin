export const gettotalRowCurrent = (
  total: number,
  page: number,
  rowsPerPage: number
): number => {
  if (Boolean(total) && page * rowsPerPage > total) {
    return Math.ceil(total / rowsPerPage);
  }
  return rowsPerPage;
};
