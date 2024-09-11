import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class SigninDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(8)
  @Max(16)
  password: string;
}
