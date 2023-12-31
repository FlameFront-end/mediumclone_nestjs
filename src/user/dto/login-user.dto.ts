import { IsNotEmpty } from "class-validator";

export class LoginUserDto {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly email: string;
}
