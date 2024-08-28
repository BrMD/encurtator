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
  shortUrl: String;
  encryptedUrl: String;
  userId: String;
  createAt: Date;
};
