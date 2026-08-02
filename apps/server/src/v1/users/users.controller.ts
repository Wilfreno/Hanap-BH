import { Body, Controller, Post } from '@nestjs/common';
import { ResponseMessage } from '../../common/response-message.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller({ path: 'user', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('user created')
  create(@Body() credentails: CreateUserDto) {
    return this.usersService.create(credentails);
  }
}
