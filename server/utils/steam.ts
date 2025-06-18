import { JSDOM } from 'jsdom';

export const getIdFromSteamUrl = (url: string) => {
  const regex = /\/app\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export async function getSteamData(url: string) {
  const res = await $fetch<string>(url);

  const dom = new JSDOM(res);

  const document = dom.window.document;

  const title = document.querySelector('#appHubAppName')?.textContent;
  const image = document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute('content');
  const metaUrl = document
    .querySelector('meta[property="og:url"]')
    ?.getAttribute('content');

  const comingSoon = document.querySelector('.game_area_comingsoon');

  return {
    name: title?.replace(' on Steam', '').replace('Save 10% on ', ''),
    image,
    url: metaUrl,
    released: !comingSoon,
  };
}
