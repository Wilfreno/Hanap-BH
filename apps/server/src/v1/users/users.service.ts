import { ConflictException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@repo/schemas/user.schema';
import { hash } from 'bcrypt';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create({ email, password }: CreateUserDto) {
    if (await this.userModel.exists({ email }))
      throw new ConflictException('email already in use');

    let hashed_password;
    if (password) {
      hashed_password = await hash(password!, 14);
    }

    await this.userModel.create({
      email,
      password: hashed_password,
    });

    return;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
