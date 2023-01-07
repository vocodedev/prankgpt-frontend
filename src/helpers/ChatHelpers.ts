export const timestampToString = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
