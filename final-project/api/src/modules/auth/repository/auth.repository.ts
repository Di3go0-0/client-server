import { RegisterType } from "../types";

export abstract class AuthRepository {
  abstract register(body: RegisterType): Promise<number>
}
