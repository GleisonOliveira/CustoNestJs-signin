import { IsEmail, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @Min(3)
  @Max(20)
  name: string;

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
