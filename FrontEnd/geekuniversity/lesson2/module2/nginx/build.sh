VERSION=1.0.1
IMAGE=hub.docker.com/beijing/geek-nginx:$VERSION
docker build -t $IMAGE .
# docker push $IMAGE