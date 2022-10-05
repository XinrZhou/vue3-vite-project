# 使用nginx镜像
FROM nginx
# 作者
MAINTAINER zhouxr
# 添加自己的 nginx.conf到nginx目录
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
# 把刚才生成dist文件夹下的文件copy到nginx下面去 入口文件
COPY ./dist/  /usr/share/nginx/html/
 
# CMD ['npm','run','start']
