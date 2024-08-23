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
  ShortUrl: String;
  encryptedUrl: String;
  userId: String;
  createAt: Date;
};

// @Id @JsonProperty("id") UUID id,
//     @NotNull @NotBlank @Column(length=15, nullable = false) String ShortUrl,
//     @NotNull @NotBlank @Column(length=100, nullable=false) String encryptedUrl,
//     @JsonProperty("userId") UUID userId,
//     @NotNull Date createAt
