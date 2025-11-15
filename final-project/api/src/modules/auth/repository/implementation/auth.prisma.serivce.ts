import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { DatabaseService } from "src/core/database/database.service";
import { AuthSql } from "../../sql/auth.sql";
import { AUTH_MESSAGES } from "../../constans";
import { EmailExistType, UserNameExistType } from "../../entities";
import { RegisterType } from "../../types";

@Injectable()
export class AuthDbService implements AuthRepository {
  private readonly logger = new Logger(AuthDbService.name);

  constructor(
    private readonly dbService: DatabaseService,
  ) { }


  async register(body: RegisterType): Promise<number> {
    const { userName, email, password } = body
    try {
      await this.emailExist(email)
      await this.UserNameExist(userName)

      const Email = await this.dbService.executeProcedure(
        AuthSql.CreateUser,
        [
          userName,
          email,
          password
        ]
      )

      return 1
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
      return 0;
    }
  }

  private async emailExist(email: string) {
    try {
      const Email = await this.dbService.executeSelect<EmailExistType>(
        AuthSql.EmailExist,
        [email]
      )

      if (Email[0].EmailExists === 1) {
        throw new HttpException(AUTH_MESSAGES.ERROR.EMAIL_EXIST, HttpStatus.CONFLICT);
      }

      return true
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
    }
  }

  private async UserNameExist(userName: string) {
    try {
      const Email = await this.dbService.executeSelect<UserNameExistType>(
        AuthSql.UserNameExist,
        [userName]
      )

      if (Email[0].UserNameExist === 1) throw new HttpException(AUTH_MESSAGES.ERROR.USERNAME_EXIST, HttpStatus.CONFLICT);

      return true
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
    }
  }

}
