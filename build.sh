#!/bin/bash
# 基础版本demo分享
prot=$1
if [ -z $prot ];then 
  echo 退出 请输入端口号! 
  exit 
fi
# docker --help 查看所有命令   
# 如果有启动---获取当前镜像的容器id 并删除
container_id=$(docker ps -a | grep vue-demo | sed -n "1p"| awk '{print $1}');
if [ -n "$container_id" ];then 
  echo "\033[31m have containerId $container_id removeing..... \033[0m"
  # 删除容器 && 删除镜像
  docker rm -f $container_id &&  docker rmi vue-demo:1.0
  echo "\033[32m remove success \033[0m"
fi
 
echo start build && npm run build && echo build success
# 打包镜像
echo start docker build && docker build -t vue-demo:1.0 . && echo "\033[32m docker build success \033[0m"
echo start serve
# 启动 -d 后台启动容器 -p映射本地端口 
editionLog=$(docker run -d --name vue-demo-run -p $prot:80 vue-demo:1.0)
# rm -rf ./test.log
dataString=`date +%Y%m%d%H%M%S`
# 输出日志文件
nohup docker logs -f ${editionLog} > ./$dataString.log & 
echo "\033[32m start success opening.... \033[0m"
 
 
 
# 自动打开入口页面
open http://127.0.0.1:$prot
 
# 下面内容为扩展
# tar包的目的主要是为了跨端，相当于程序包传给朋友，朋友安装
# docker save -o ./vue-demo.tar vue-demo:1.0
# docker load < vue-demo.tar  会load出程序镜像。
 
 
# 常规来说是上传到镜像仓库统一管理，服务器拉去镜像进行部署
# read -p '是否上传镜像到仓库?[y/n]' isContinue
# if [ ${isContinue} = 'y' ]; then
  #echo upload images
  # docker tag :标记本地镜像,将其归入某一仓库
  # docker tag vue-demo:1.0 reg.hdec.com/dam/vue-demo:1.0
  # 上传镜像到仓库
  #docker push eg.hdec.com/test/vue-demo:1.0
  #echo "\033[46;37m 上传成功，本次分享结束 \033[0m"
  # else
  # exit
#fi
# sudo docker exec -it 775c7c9ee1e1 bash   进入容器可更改
# docker cp 7f983e614960:/usr/share/nginx/html/index.html pwd 拷贝文件到本地
# docker save -o ./vue-demo.tar vue-demo:1.0  跨平台部署 save   
# docker load < tar  load本地镜像