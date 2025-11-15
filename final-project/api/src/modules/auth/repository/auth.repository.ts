import { LoginType, RegisterType, UserType } from "../types";

export abstract class AuthRepository {
  abstract Login(body: LoginType): Promise<UserType>
  abstract register(body: RegisterType): Promise<number>
}
