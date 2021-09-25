#运行
docker run --rm hub.docker.com/beijing/nginx-dev:1.0.1

#后台运行
docker run -d hub.docker.com/beijing/nginx-dev:1.0.1

#交互式
docker run --rm -it hub.docker.com/beijing/nginx-dev:1.0.1 sh

#端口映射
docker run -d -p 7000:80 hub.docker.com/beijing/nginx-dev:1.0.1

#挂载卷
docker run -d -p 7000:80 -v /Users/linxi/work/workspace/volumes:/usr/share/nginx/html hub.docker.com/beijing/nginx-dev:1.0.1
