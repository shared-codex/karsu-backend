export interface AccessTokenPayload {
  sub: number;
  tv: number;
}

export interface RefreshTokenPayload extends AccessTokenPayload {
  jti: string;
}
