#GIT_COMMIT_SHORT_SHA=$(git rev-parse --short=8 HEAD)
#echo $GIT_COMMIT_SHORT_SHA

# sh build.sh prod 线上环境
# sh build.sh test 测试环境
# sh build.sh dev  开发环境
if [ "$1"x = "prod"x ]; then
  nginx_file="default-prod.conf"
  env="prod"
elif [ "$1"x = "test"x ]; then
  nginx_file="default-test.conf"
  env="test"
elif [ "$1"x = "dev"x ]; then
  nginx_file="default-dev.conf"
  env="dev"
else
  echo '>>>>>>>>>>>[build param error]>>>>>>>>>>>>>>'
  exit 1
fi

VERSION=1.0.1
IMAGE=hub.docker.com/beijing/nginx-$env:$VERSION
docker build -t $IMAGE . --build-arg env=$env
# docker push $IMAGE