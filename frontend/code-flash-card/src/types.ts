export interface HashTagFromServer {
  cardHashtagId: number;
  name: string;
}

export interface CardFromServer {
  cardId: number;
  explain: string;
  answer: string;
  viewCount: number;
  hashtags: HashTagFromServer[];
}

export interface UserInfoFromServer {
  password: string;
  username: string;
}

export interface TokenFromServer {
  accessToken: string;
  accessTokenExpiresIn: "";
  grantType: string;
  refreshToken: string;
}
