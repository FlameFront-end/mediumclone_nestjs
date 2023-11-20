import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserResponseInterface } from "./types/userResponse.interface";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("users")
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body("user") dto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(dto);
    return this.userService.buildUserResponse(user);
  }
}
