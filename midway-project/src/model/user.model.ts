import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/orm';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(username, password) {
    const users = await this.userRepo
      .createQueryBuilder()
      .where({ username: username, password: password })
      .getMany();
    return users;
  }

  async addUser(userLoginDTO) {
    let record = new UserEntity();
    record = this.userRepo.merge(record, userLoginDTO);
    try {
      const created = await this.userRepo.save(record);
      return created;
    } catch (e) {
      console.log(e);
    }
  }
}
