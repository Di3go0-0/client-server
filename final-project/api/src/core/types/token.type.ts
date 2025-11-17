export type GenerateTokenProps = {
  id: number;
  email: string;
}

export type TokenProps = {
  id: number;
  email: string;
  iat: number;
  exp: number;
}
