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
简单实现了两个接口

admin.login

mina.login

以及一些辅助工具方法

### 技术选型

基于nodejs实现，api框架用express，数据库是mongodb
