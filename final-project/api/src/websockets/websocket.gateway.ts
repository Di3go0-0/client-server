import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { UsersService } from "./gateways/services/users.service";
import { UnauthorizedException, Logger } from "@nestjs/common"; // Importa Logger y UnauthorizedException
import { JwtService } from "src/core/jwt/jwt.service"; // Asegúrate de que la ruta sea correcta
import { DatabaseService } from "src/core/database/database.service"; // Asegúrate de que la ruta sea correcta
import { JwtSql } from "src/core/jwt-guard/sql/jwt.sql"; // Asegúrate de que la ruta sea correcta
import { UserType } from "src/modules/auth/types"; // Asegúrate de que la ruta sea correcta
import { EventEmitter2 } from '@nestjs/event-emitter';


@WebSocketGateway({ cors: { origin: '*' } }) // Quita @UseGuards aquí
export class GlobalGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(GlobalGateway.name); // Añade un logger aquí

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Inyecta JwtService
    private readonly dbService: DatabaseService, // Inyecta DatabaseService
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async handleConnection(client: Socket) { // Hazlo async para poder usar await
    this.logger.log(`Attempting to connect: ${client.id}`);
    const token = client.handshake?.auth?.token;

    if (!token) {
      this.logger.warn(`No token found for client ${client.id}. Disconnecting.`);
      client.disconnect(true); // Desconecta al cliente si no hay token
      return; // Sale de la función
    }

    try {
      const payload = await this.jwtService.verifyToken(token);
      this.logger.debug(`Token payload for ${client.id}: ${JSON.stringify(payload)}`);

      const rows = await this.dbService.executeSelect<UserType>(JwtSql.GetUser, [payload.email, payload.id])
      const user = rows[0]

      if (!user) {
        this.logger.warn(`User with ID ${payload.id} from token not found or inactive for client ${client.id}. Disconnecting.`);
        client.disconnect(true); // Desconecta si el usuario no es válido
        return;
      }

      client.data = client.data || {};
      client.data.user = user;
      if (!this.usersService.getUserById(user.id))
        this.usersService.addUser(client.id, user); // Add clientId to user before passing
      this.logger.log(`Client connected `);
      this.eventEmitter.emit('user.toogle.connection', user.id);
      this.eventEmitter.emit('update.users.actives');
      console.log("------------------------------------------------------------")
      console.log("------------------------------------------------------------")
      console.log("Conexion establecida")
    } catch (error) {
      this.logger.error(`Authentication error for client ${client.id}: ${error.message}. Disconnecting.`);
      client.disconnect(true); // Desconecta al cliente por cualquier error de autenticación
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log("Desconexión global:", client.id);
    const user = this.usersService.getUser(client.id)
    this.usersService.removeUser(client.id);
    if (!user) return
    this.logger.log(`Client connected `);
    console.log(this.usersService.getAllUsers())
    this.eventEmitter.emit('user.toogle.connection', user.id);
    this.eventEmitter.emit('update.users.actives');

    console.log("------------------------------------------------------------")
    console.log("------------------------------------------------------------")
    console.log("Conexion perdida")
  }
}
