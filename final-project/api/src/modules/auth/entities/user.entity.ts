export type UserEntity = {
  id: number;
  userName: string;
  email: string;
  password: string;
}

export type UserExposeEntity = Omit<UserEntity, 'password'>

export type EmailExistType = {
  EmailExists: number
}

export type UserNameExistType = {
  UserNameExist: number
}
