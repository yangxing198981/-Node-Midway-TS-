import { Rule } from '@midwayjs/validate';
import { Provide } from '@midwayjs/decorator';
import { RuleType } from '@midwayjs/validate/dist/decorator/rule';

@Provide()
export class UserLoginDTO {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
