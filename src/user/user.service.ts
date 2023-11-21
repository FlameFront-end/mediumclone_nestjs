import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from "bcrypt";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (userByEmail || userByUsername) {
      throw new HttpException(
        "Email or username are taken",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(userId: number, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(userId);
    Object.assign(user, dto); // заменяем, мутируя
    return await this.userRepository.save(user);
  }

  async login(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: ["id", "username", "email", "password", "bio", "id", "image"],
    });

    if (!user) {
      throw new HttpException(
        "Credentials are not valid",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect: boolean = await compare(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        "Credentials are not valid",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;

    return user;
  }

  findById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } });
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
