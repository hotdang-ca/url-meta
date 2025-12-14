#!/bin/sh

docker run \
  --expose 80 \
  --network=nginx-proxy \
  -d \
  --restart always \
  --name urlmeta-web \
  -e VIRTUAL_HOST=urlmeta.fourandahalfgiraffes.ca \
  -e LETSENCRYPT_HOST=urlmeta.fourandahalfgiraffes.ca \
  -e LETSENCRYPT_EMAIL=james+urlmeta@hotdang.ca \
  urlmeta-web
