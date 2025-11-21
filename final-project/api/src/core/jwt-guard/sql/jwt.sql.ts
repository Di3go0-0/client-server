export enum JwtSql {
  GetUser = ` 
    SELECT
      u.id,
      u.userName,
      u.email
    FROM users u 
    WHERE  u.email = ? 
  `,
}
