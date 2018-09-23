#!/usr/bin/env bash

hosthttps=${HOSTHTTPS:-'staging-nginz-https.zinfra.io'}
hostssl=${HOSTSSL:-'staging-nginz-ssl.zinfra.io'}

echo "Running the webapp pointing at: ${hosthttps} and ${hostssl}"

find /src/aws/static/min -type f -exec sed -i "s/staging-nginz-https.zinfra.io/$hosthttps/g" {} \;
find /src/aws/static/min -type f -exec sed -i "s/staging-nginz-ssl.zinfra.io/$hostssl/g" {} \;

cd /src/aws && python application.py
