/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignupDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const hashedPassword: any = await bcrypt.hash(dto.password, 10);
    const authUser = await this.prisma.authUser.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword,
        role: 'USER',
        user: {
          create: {
            username: dto.username,
            email: dto.email,
          },
        },
      },
      include: { user: true },
    });

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    await this.prisma.validation.create({
      data: {
        authUserId: authUser.id,
        code: otpCode,
        type: 'EMAIL_VERIFY',
        otpExpiry: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    // TODO: send OTP via email
    return {
      message: 'Signup successful. Please verify your email with the OTP.',
    };
  }

  async login(dto: LoginDto) {
    const authUser = await this.prisma.authUser.findUnique({
      where: { email: dto.email },
      include: { user: true },
    });

    if (!authUser || !(await bcrypt.compare(dto.password, authUser.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!authUser.isVerified) {
      throw new UnauthorizedException('Please verify your account first');
    }

    const payload = {
      id: authUser.id,
      email: authUser.email,
      role: authUser.role,
      name: authUser.username,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const authUser = await this.prisma.authUser.findUnique({
      where: { email: dto.email },
    });

    if (!authUser) throw new NotFoundException('User not found');

    const validation: any = await this.prisma.validation.findFirst({
      where: {
        authUserId: authUser.id,
        code: dto.otp,
        type: 'EMAIL_VERIFY',
        isUsed: false,
      },
    });

    if (!validation || validation?.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: { isVerified: true },
    });

    await this.prisma.validation.update({
      where: { id: validation.id },
      data: { isUsed: true },
    });

    return { message: 'Email verified successfully' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const authUser = await this.prisma.authUser.findUnique({
      where: { email: dto.email },
    });
    if (!authUser) throw new NotFoundException('User not found');

    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.prisma.validation.create({
      data: {
        authUserId: authUser.id,
        code: resetOtp,
        type: 'FORGOT_PASSWORD',
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // TODO: send OTP via email

    return { message: 'Password reset OTP sent to your email' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const authUser = await this.prisma.authUser.findUnique({
      where: { email: dto.email },
    });
    if (!authUser) throw new NotFoundException('User not found');

    const validation: any = await this.prisma.validation.findFirst({
      where: {
        authUserId: authUser.id,
        code: dto.otp,
        type: 'FORGOT_PASSWORD',
        isUsed: false,
      },
    });

    if (!validation || validation.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: { password: hashedPassword },
    });

    await this.prisma.validation.update({
      where: { id: validation.id },
      data: { isUsed: true },
    });

    return { message: 'Password reset successfully' };
  }

  async changePassword(dto: ChangePasswordDto) {
    const authUser: any = await this.prisma.authUser.findFirst();

    if (!(await bcrypt.compare(dto.oldPassword, authUser.password))) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.authUser.update({
      where: { id: authUser.id },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }
}
