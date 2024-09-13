export const getIdFromSteamUrl = (url: string) => {
  const regex = /\/app\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
