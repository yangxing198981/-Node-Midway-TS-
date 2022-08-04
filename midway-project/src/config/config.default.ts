import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659443429025_5390',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  },
  jwt: {
    secret: 'dev123456',
    expiresIn: '10d',
  },
} as MidwayConfig;
