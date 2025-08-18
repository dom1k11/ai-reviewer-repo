export interface User {
  id: number;
  auth0_id: string;
  nickname: string;
  createdAt: Date;
}

export interface UserId {
  id: number;
}
