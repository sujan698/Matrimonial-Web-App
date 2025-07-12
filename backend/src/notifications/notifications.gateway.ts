import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } }) // Enable WebSocket CORS
export class NotificationsGateway {
  // @WebSocketServer()
  // server: Server;
  // private activeUsers = new Map<number, string>(); // Store user socket connections
  // // When a user connects
  // handleConnection(socket: Socket) {
  //   console.log(` New client connected: ${socket.id}`);
  // }
  // // When a user disconnects
  // handleDisconnect(socket: Socket) {
  //   console.log(` Client disconnected: ${socket.id}`);
  //   this.activeUsers.forEach((value, key) => {
  //     if (value === socket.id) this.activeUsers.delete(key);
  //   });
  // }
  // // Subscribe user to receive notifications
  // @SubscribeMessage('join')
  // handleJoin(
  //   @MessageBody() data: { userId: number },
  //   @ConnectedSocket() socket: Socket,
  // ) {
  //   console.log(` User ${data.userId} joined WebSocket`);
  //   this.activeUsers.set(data.userId, socket.id);
  //   socket.join(`user_${data.userId}`);
  // }
  // // Send real-time notification to a specific user
  // sendNotification(userId: number, message: string) {
  //   const socketId = this.activeUsers.get(userId);
  //   if (socketId) {
  //     this.server.to(socketId).emit('newNotification', { message });
  //     console.log(` Sent notification to User ${userId}: ${message}`);
  //   }
  // }
}
