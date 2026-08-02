import { User } from '@repo/schemas/user.schema';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  password?: string | undefined;
}
