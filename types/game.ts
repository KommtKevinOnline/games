import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

export interface Game extends ParsedContent {
  title: string;
  description: string;
  image: string;
  url: string;
}
