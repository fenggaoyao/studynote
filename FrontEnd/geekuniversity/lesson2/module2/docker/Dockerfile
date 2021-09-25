FROM nginx:1.17.4-alpine

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /usr/share/nginx/html/
RUN mkdir -p /etc/nginx/conf.d
RUN mkdir -p /var/log/nginx

ARG env=dev
# copy files to nginx root
COPY ./dist /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default-${env}.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]