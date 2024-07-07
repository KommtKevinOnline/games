declare module '#auth-utils' {
  interface User {
    twitchId: string;
    email: string;
    name: string;
    displayName: string;
    avatar: string;
  }

  interface UserSession {}
}

export {};
