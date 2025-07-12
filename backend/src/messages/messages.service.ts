import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(senderId: number, receiverId: number, messageContent: string) {
    if (senderId === receiverId) {
      throw new BadRequestException('Sender and receiver cannot be the same.');
    }

    return this.prismaService.message.create({
      data: {
        senderId,
        receiverId,
        messageContent,
        sentAt: new Date(),
      },
    });
  }

  async findAll() {
    return this.prismaService.message.findMany({
      include: {
        sender: true,
        receiver: true,
      },
    });
  }

  async findOne(id: number) {
    return this.getMessageById(id);
  }

  async update(id: number, messageContent: string) {
    const message = await this.getMessageById(id);

    return this.prismaService.message.update({
      where: { id },
      data: { messageContent },
    });
  }

  async markAsRead(id: number) {
    const message = await this.getMessageById(id);

    if (message.readAt) {
      throw new BadRequestException('Message is already marked as read.');
    }

    return this.prismaService.message.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async remove(id: number) {
    await this.getMessageById(id);
    return this.prismaService.message.delete({ where: { id } });
  }

  private async getMessageById(id: number) {
    const message = await this.prismaService.message.findUnique({
      where: { id },
      include: {
        sender: true,
        receiver: true,
      },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} does not exist.`);
    }

    return message;
  }
}
