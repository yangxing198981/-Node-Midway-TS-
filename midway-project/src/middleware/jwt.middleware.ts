import { Middleware } from '@midwayjs/decorator';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }
}
