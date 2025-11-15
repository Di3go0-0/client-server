import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { AuthRepository } from "../auth.repository";
import { DatabaseService } from "src/core/database/database.service";
import { AuthSql } from "../../sql/auth.sql";
import { AUTH_MESSAGES } from "../../constans";
import { EmailExistType } from "../../entities";

@Injectable()
export class AuthDbService implements AuthRepository {
  private readonly logger = new Logger(AuthDbService.name);

  constructor(
    private readonly dbService: DatabaseService,
  ) { }



  async emailExist(email: string) {
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

  async UserNameExist(userName: string) {
    try {
      const Email = await this.dbService.executeSelect<EmailExistType>(
        AuthSql.UserNameExist,
        [userName]
      )

      if (Email[0].EmailExists == 1) throw new HttpException(AUTH_MESSAGES.ERROR.EMAIL_EXIST, HttpStatus.CONFLICT);

      return true
    } catch (err) {
      if (err instanceof HttpException) { throw err; }
      this.logger.error(err)
    }
  }

}
