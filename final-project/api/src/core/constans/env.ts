export const ENV = {
  CONSTANS:
  {
    API_PORT: process.env.API_PORT,
    SWAGGER_RUTE: process.env.SWAGGER_RUTE || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  }
}
