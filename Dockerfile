FROM alpine
WORKDIR /app

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 切换阿里源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# 在 Docker 镜像构建过程中安装 Node.js 和 Yarn
# 使用 apk 包管理器添加最新版本的 Node.js 和 Yarn，并且不保留缓存以减小镜像体积
RUN apk add --no-cache --update nodejs yarn
RUN apk add --no-cache --update nodejs yarn
RUN yarn config set registry https://registry.npm.taobao.org 

# 安装依赖 --production
COPY package.json yarn.lock /app/
RUN yarn install --frozen-lockfile --legacy-peer-deps

# 打包构建
COPY . /app

ENV NODE_ENV production

EXPOSE 30000

ENV PORT 30000

CMD ["node", "app.js"]


