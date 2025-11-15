import { Injectable, Logger } from '@nestjs/common';
import { createPool, Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { ConstansService } from 'src/core/constans/constans.service';
import { ENV } from 'src/core/constans/env';

@Injectable()
export class MysqlService {
  private readonly logger = new Logger(MysqlService.name);
  private pool: Pool;

  constructor(
    private readonly constans: ConstansService
  ) {
    this.initConnection();
  }

  private initConnection() {
    this.pool = createPool({
      uri: this.constans.getdatabaseUrl(),
      connectionLimit: 10,
    });
    this.logger.log('MySQL connection pool initialized ✔️');
  }

  /** SELECT */
  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const [rows] = await this.pool.query<RowDataPacket[]>(sql, params);
      this.logger.log(sql, params)
      this.logger.debug(rows);
      return rows as T[];
    } catch (error) {
      this.logger.error(`MySQL query error: ${error.message}`);
      throw error;
    }
  }


  /** INSERT / UPDATE / DELETE / PROCEDURE */
  async execute<T = any>(sql: string, params: any[] = []): Promise<T & { insertId?: number }> {
    try {
      const [result] = await this.pool.execute<ResultSetHeader>(sql, params);
      this.logger.log(result);
      // convertimos primero a unknown, luego a T & { insertId?: number }
      return result as unknown as T & { insertId?: number };
    } catch (error) {
      this.logger.error(`MySQL execute error: ${error.message}`);
      throw error;
    }
  }

}

