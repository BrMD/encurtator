export type Encurtator = {
  shortUrl: String;
  createAt: Date;
};

export type EncurtatorPost = {
  longUrl: string;
  sessionId: string;
};

export type EncurtatorResult = {
  id: String;
  shortUrl: string;
  encryptedUrl: string;
  userId: String;
  createAt: Date;
};
