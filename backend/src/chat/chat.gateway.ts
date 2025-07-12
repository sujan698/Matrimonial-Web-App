import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private onlineUsers = new Map<number, string>();

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (userId) {
        this.onlineUsers.set(userId, client.id);
        console.log(`Client connected: ${client.id}, User ID: ${userId}`);
        // Notify all clients about online users update
        this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys()));
      } else {
        client.disconnect();
        console.log(`Unauthorized connection attempt: ${client.id}`);
      }
    } catch (error) {
      console.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    try {
      const userId = this.getUserIdFromSocket(client);
      if (userId) {
        this.onlineUsers.delete(userId);
        this.server.emit('onlineUsers', Array.from(this.onlineUsers.keys()));
      }
      console.log(`Client disconnected: ${client.id}`);
    } catch (error) {
      console.error('Disconnection error:', error);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { receiverId: number; messageContent: string },
  ) {
    try {
      const senderId = this.getUserIdFromSocket(client);
      if (!senderId) {
        client.emit('error', { message: 'Unauthorized' });
        return { error: 'Unauthorized' };
      }
      if (!data.receiverId || !data.messageContent) {
        client.emit('error', { message: 'Receiver ID and message content are required' });
        return { error: 'Receiver ID and message content are required' };
      }

      const match = await this.prismaService.match.findFirst({
        where: {
          OR: [
            { user1Id: senderId, user2Id: data.receiverId },
            { user1Id: data.receiverId, user2Id: senderId },
          ],
        },
      });

      if (!match) {
        client.emit('error', { message: 'You can only message matched users' });
        return { error: 'You can only message matched users' };
      }

      const message = await this.prismaService.message.create({
        data: {
          senderId,
          receiverId: data.receiverId,
          messageContent: data.messageContent,
          sentAt: new Date(),
        },
        include: {
          sender: true,
          receiver: true,
        },
      });

      // Send to sender
      const senderSocketId = this.onlineUsers.get(senderId);
      if (senderSocketId) {
        this.server.to(senderSocketId).emit('newMessage', message);
      }

      // Send to receiver
      const receiverSocketId = this.onlineUsers.get(data.receiverId);
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('newMessage', message);
      }

      return message;
    } catch (error) {
      console.error('Message handling error:', error);
      client.emit('error', { message: 'Internal server error' });
      return { error: 'Internal server error' };
    }
  }

  private getUserIdFromSocket(client: Socket): number | null {
    try {
      const token =
        client.handshake.auth.token ||
        client.handshake.headers.authorization?.split(' ')[1];
      console.log('Received token:', token); // Debug log

      if (!token) {
        console.error('No token provided');
        return null;
      }

      const payload = this.jwtService.verify(token);
      console.log('Token payload:', payload); // Debug log

      // Use the 'id' field instead of 'sub'
      return payload.id || null;
    } catch (error) {
      console.error('Token verification error:', error);
      return null;
    }
  }
}
