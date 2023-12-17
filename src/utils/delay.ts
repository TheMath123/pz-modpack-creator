export const delay = (amount = 350) =>
  new Promise((resolve) => setTimeout(resolve, amount));
