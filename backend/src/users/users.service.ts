import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private capitalizeFirstLetterOfEachPhrase(text: string): string {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.checkIfEmailExists(createUserDto.email)) {
      throw new BadRequestException(
        `Email ${createUserDto.email} has already been taken`,
      );
    }

    if (
      createUserDto.googleId &&
      (await this.checkIfGoogleIdExists(createUserDto.googleId))
    ) {
      throw new BadRequestException(
        `Google ID ${createUserDto.googleId} has already been taken`,
      );
    }

    createUserDto.fullname = this.capitalizeFirstLetterOfEachPhrase(
      createUserDto.fullname,
    );

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.prismaService.user.create({ data: createUserDto });
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    return this.getUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.getUserById(id);

    if (
      updateUserDto.email &&
      (await this.checkIfEmailExists(updateUserDto.email, id))
    ) {
      throw new BadRequestException(
        `Email ${updateUserDto.email} has already been taken`,
      );
    }

    if (
      updateUserDto.googleId &&
      (await this.checkIfGoogleIdExists(updateUserDto.googleId, id))
    ) {
      throw new BadRequestException(
        `Google ID ${updateUserDto.googleId} has already been taken`,
      );
    }

    if (updateUserDto.fullname) {
      updateUserDto.fullname = this.capitalizeFirstLetterOfEachPhrase(
        updateUserDto.fullname,
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    await this.getUserById(id);
    return this.prismaService.user.delete({ where: { id } });
  }

  private async getUserById(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} does not exist`);
    }
    return user;
  }

  private async checkIfEmailExists(email: string, id?: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (id) {
      return user ? user.id === id : false;
    }
    return !!user;
  }

  private async checkIfGoogleIdExists(
    googleId: string,
    id?: number,
  ): Promise<boolean> {
    if (!googleId) return false;
    const user = await this.prismaService.user.findUnique({ where: { googleId } });
    if (id) {
      return user ? user.id === id : false;
    }
    return !!user;
  }
}