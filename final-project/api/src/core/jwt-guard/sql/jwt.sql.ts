export enum JwtSql {
  GetUser = ` 
    SELECT
      u.id,
      u.userName,
      u.email,
      u.password
    FROM users u 
    WHERE  u.email = ? 
    AND u.id = ?
  `,
}
