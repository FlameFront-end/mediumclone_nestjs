import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import * as process from "process";
import { UserResponseInterface } from "./types/userResponse.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  generateJwt(user: UserEntity) {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      "hgdfodiugfsdfgpour234",
    );
  }
  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }
}
