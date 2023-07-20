// 接口类型定义
export interface ResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Login {
  export interface params {
    userName: string;
    userPwd: string;
  }
}

