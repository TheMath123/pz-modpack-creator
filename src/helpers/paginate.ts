export const paginate = (
  items: ModObject[],
  maxItemsPerPage: number,
): ModObject[][] => {
  const pages = [];
  for (let i = 0; i < items.length; i += maxItemsPerPage) {
    pages.push(items.slice(i, i + maxItemsPerPage));
  }
  return pages;
};
