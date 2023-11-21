import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login-user.dto";
import { ExpressRequestInterface } from "../types/expressRequest.interface";
import { User } from "./decorators/user.decorator";
import { UserEntity } from "./entities/user.entity";

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

  @Post("users/login")
  @UsePipes(new ValidationPipe())
  async login(@Body("user") dto: LoginUserDto): Promise<UserResponseInterface> {
    const user = await this.userService.login(dto);
    return this.userService.buildUserResponse(user);
  }

  @Get("/user")
  async getCurrentUser(
    @User() user: UserEntity,
  ): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }
}
