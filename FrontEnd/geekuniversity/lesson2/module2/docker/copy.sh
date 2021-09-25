
#从容器拷贝文件到宿主机
docker cp mycontainer:/opt/testnew/file.txt /opt/test/

#从宿主机拷贝文件到容器
docker cp /opt/test/file.txt mycontainer:/opt/testnew/

# 导出镜像
docker save 0fdf2b4c26d3 > image.tar

# 载入镜像
docker load < image.tar