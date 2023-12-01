/* eslint-disable no-unused-vars */

/** 系統環境 */
export enum SYSTEM_ENV {
  LOCALHOST = 'localhost',
  DEVELOPMENT = 'dev',
  PRODUCTION = 'prod',
}

export enum POLITIC_PROGRESS {
  NOT_START = 'no-progress', // 還沒開始
  IN_PROGRESS = 'in-progress', // 進行中
  IN_TROUBLE = 'in-trouble', // 卡關中
  COMPLETED = 'complete', // 已完成
}
