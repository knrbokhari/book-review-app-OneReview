/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  validate(...args: any[]): unknown {
    throw new Error('Method not implemented.');
  }
}
