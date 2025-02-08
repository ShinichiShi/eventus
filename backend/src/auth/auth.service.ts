import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { TokenResponse } from './types/auth.types';

interface MongoError extends Error {
  code?: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string): Promise<TokenResponse> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new this.userModel({
        email,
        password: hashedPassword,
      });
      const savedUser = await user.save();
      const token = this.jwtService.sign({ userId: savedUser._id });
      return { token };
    } catch (error: unknown) {
      if (error instanceof Error && (error as MongoError).code === 11000) {
        throw new UnauthorizedException('Email already exists');
      }
      throw new UnauthorizedException('Error creating user');
    }
  }

  async login(email: string, password: string): Promise<TokenResponse> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({ userId: user._id });
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials' + error);
    }
  }
}
