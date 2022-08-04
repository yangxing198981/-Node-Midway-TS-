import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { UserModel } from '../model/user.model';
import { Context } from '@midwayjs/koa';
import { UserLoginDTO } from '../dto/user.dto';
import { JwtService } from '@midwayjs/jwt';
@Controller('/api/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  jwt: JwtService;

  @Inject()
  userModel: UserModel;

  @Inject()
  userLoginDTO: UserLoginDTO;

  @Post('/adduser')
  async addUser() {
    this.userLoginDTO.username = 'jack';
    this.userLoginDTO.password = 'redballoon';
    const user = await this.userModel.addUser(this.userLoginDTO);
    return { success: true, message: 'OK', data: user };
  }

  @Post('/login')
  async login(@Body() bodyData: UserLoginDTO) {
    const users = await this.userModel.getUserByUsernameAndPassword(
      bodyData.username,
      bodyData.password
    );
    if (users.length === 0) {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
    const token = await this.jwt.sign({
      id: users[0].id,
      username: users[0].username,
    });
    return {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: {
        token: token,
      },
    };
  }
}
