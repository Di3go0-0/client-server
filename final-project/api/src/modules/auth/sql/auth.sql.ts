export enum AuthSql {

  UserNameExist = `SELECT PKG_USERS_UserNameExists(?) AS UserNameExist`,

  EmailExist = ` SELECT PKG_USERS_EmailExists(?) AS EmailExists`,

  CreateUser = ` CALL PKG_USERS_CreateUser(?, ?, ?)`,

  Login = ` SELECT PKG_USERS_Login(?,?) AS Login`,

  GetUser = ` 
    SELECT
      u.id,
      u.userName,
      u.email,
      u.password
    FROM users u 
    WHERE  u.email = ? 
  `,
}
