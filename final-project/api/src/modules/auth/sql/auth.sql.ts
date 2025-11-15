export enum AuthSql {

  UserNameExist = `SELECT PKG_USERS_UserNameExists(?) AS UserNameExist`,

  EmailExist = ` SELECT PKG_USERS_EmailExists(?) AS EmailExists`,

  CreateUser = ` CALL PKG_USERS_CreateUser(?, ?, ?)`
}
