import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MysqlService } from './services/mysql.service';
import { ExecuteQueryResult } from './types/query.type';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private readonly mysql: MysqlService) { }


  /** SELECT plano */
  async executeSelect<T>(
    query: string,
    params: Array<string | number> = [],
  ): ExecuteQueryResult<T> {
    try {
      const rows = await this.mysql.query<T>(query, params);
      return rows;
    } catch (error) {
      this.logger.error(`Error en executeSelect: ${error.message}`);
      throw error;
    }
  }

  /** SELECT con mapeo a clases */
  async executeQuery<T>(
    query: string,
    params: Array<string | number> = [],
    resultClass?: new (param: any) => T,
  ): ExecuteQueryResult<T> {
    try {
      const rows = await this.mysql.query<T>(query, params);

      if (resultClass) {
        return rows.map((row) => plainToClass(resultClass, row));
      }

      return rows;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /** INSERT / UPDATE / DELETE */
  async executeProcedureSave<T>(
    query: string,
    dataJson: T,
  ): Promise<number | string> {
    try {
      const jsonString = JSON.stringify(dataJson);
      const result = await this.mysql.execute(query, [jsonString]);

      return result.insertId ?? result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async executeProcedureUpdate<T>(
    query: string,
    dataJson: T,
    id: number | string,
  ): Promise<object> {
    try {
      const jsonString = JSON.stringify(dataJson);
      const result = await this.mysql.execute(query, [jsonString, id]);
      return result;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async executeProcedureDelete(query: string, id: number | string): Promise<void> {
    try {
      await this.mysql.execute(query, [id]);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

