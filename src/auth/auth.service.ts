import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user.model';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  public async createAccessToken(userId: string): Promise<string> {
    return sign(
      {
        userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    );
  }

  public async validateUser(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private extractJWT(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader || authHeader.toLowerCase().indexOf('bearer') === -1) {
      throw new BadRequestException('Token not found');
    }

    const [, token] = authHeader.split(' ');

    return token;
  }

  public getJWTToken(request: Request): string {
    return this.extractJWT(request);
  }
}
