export const getShuffle = <T>(arr: T[], count: number = 1) => {
  const items = [...arr];
  const shuffled = items.sort(() => .5 - Math.random());
  return shuffled.slice(0, count);
};
