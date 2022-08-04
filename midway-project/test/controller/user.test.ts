import { close, createApp, createHttpRequest } from "@midwayjs/mock";
import { Application, Framework } from "@midwayjs/koa";
import assert = require("assert");

describe('test/controller/user.test.ts', () => {
  let app: Application;
  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch(err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });
  afterAll(async () => {
    // close app
    await close(app);
  });

  //正常登录测试
  it('should POST /api/user/login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/api/user/login')
      .set('x-timeout', '1000')
      .send({username:"jack",password:"redballoon"});

    //assert断言
    assert(result.status == 200);
    assert('code' in result.body);
    assert('result' in result.body);
    assert('message' in result.body);
    assert('data' in result.body);
    assert(result.body.code == 200);
    //expect断言
    // expect(result.status).toBe(200);
    // expect(result.body).toHaveProperty('code');
    // expect(result.body).toHaveProperty('result');
    // expect(result.body).toHaveProperty('message');
    // expect(result.body).toHaveProperty('data');
    // expect(result.body.code).toBe(200);
  });
  //异常登录测试
  it('should POST /api/user/login', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('/api/user/login')
      .set('x-timeout', '1000')
      .send({username: 'jack',password: ''});

    //assert断言
    assert(result.status == 200);
    assert('code' in result.body);
    assert('result' in result.body);
    assert('message' in result.body);
    assert('data' in result.body);
    assert(result.body.code == 400);
    //expect断言
    // expect(result.status).toBe(200);
    // expect(result.body).toHaveProperty('code');
    // expect(result.body).toHaveProperty('result');
    // expect(result.body).toHaveProperty('message');
    // expect(result.body).toHaveProperty('data');
    // expect(result.body.code).toBe(400);
  });
});

