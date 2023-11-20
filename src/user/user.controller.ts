import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { Body, Controller, Post } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("users")
  async createUser(@Body("user") dto: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(dto);
  }
}
