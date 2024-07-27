export type Artwork = {
  id: number;
  alpha_channel: boolean;
  animated: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
};

export type Cover = {
  id: number;
  alpha_channel: boolean;
  animated: boolean;
  game: number;
  height: number;
  image_id: string;
  url: string;
  width: number;
  checksum: string;
};

export type Website = {
  id: number;
  category: number;
  game: number;
  trusted: boolean;
  url: string;
  checksum: string;
};

export type Game = {
  id: number;
  artworks: Artwork[];
  cover: Cover;
  name: string;
  websites: Website[];
  game_modes: number[];
};

export type StatusEnum = {
  0: 'released';
  2: 'alpha';
  3: 'beta';
  4: 'early_access';
  5: 'offline';
  6: 'cancelled';
  7: 'rumored';
  8: 'delisted';
};
