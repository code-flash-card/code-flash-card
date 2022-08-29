interface HashTagFromServer {
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
