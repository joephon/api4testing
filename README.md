### start mongodb via docker
```sh
docker run -d --name api4testing -p 27017:27017 mongo
```

### init project
```sh
yarn && yarn dev
```


### 也可以基于docker compose 运行项目。
```sh
docker-compose up -d
```

### 简要说明
简单实现了四个接口

admin.login    // admin 登录，覆盖鉴权，隐私加解密

mina.login     // user 登陆，覆盖鉴权
mina.qa.list   // 获取问卷列表
mina.qa.match  // 定位匹配

以及一些辅助工具方法  // utils

### 技术选型

基于nodejs实现，api框架用express，数据库是mongodb
