export enum AuthSql {

  UserNameExist = `SELECT PKG_USERS_UserNameExists(:userName) AS UserNameExist`,

  EmailExist = ` SELECT PKG_USERS_EmailExists(?) AS EmailExists`,

  CreateUser = ` CALL PKG_USERS_CreateUser(:userName, :email, :password)`
}
