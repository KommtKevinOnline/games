declare module '#auth-utils' {
  interface User {
    twitchId: string;
    email: string;
    name: string;
    displayName: string;
    avatar: string;
    accessToken: string;
    expirationDate: Date;
    refreshToken: string;
  }

  interface UserSession {}
}

export {};
