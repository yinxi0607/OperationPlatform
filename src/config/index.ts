// 环境配置封装

type ENV = 'dev'| 'stag'|'prod'

let env: ENV = 'dev'
if (location.host.indexOf('localhost:5173')>-1){
  env = 'dev'
}else if (location.host === 'localhost:58888'){
  env = 'stag'
}else{
  env = 'prod'
}

const config = {
  dev: {
    baseApi: '/api',
    mockApi: 'http://localhost:58888',
    uploadApi: 'http://localhost:58888',
    mock: true,
    cdn: 'https://cdn.aliyun.com'
  },
  stag: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/5408b1c9a0d6415307812ae1eaf0063c/api',
    uploadApi: 'http://localhost:58889',
    mock: false,
    cdn: 'https://cdn.aliyun.com'
  },
  prod: {
    baseApi: '/api',
    mockApi: 'https://www.fastmock.site/mock/5408b1c9a0d6415307812ae1eaf0063c/api',
    uploadApi: 'http://localhost:58890',
    mock: false,
    cdn: 'https://cdn.aliyun.com'
  },
}

export default {
  env,
  ...config[env]
}
