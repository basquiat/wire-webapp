#!/usr/bin/env bash

#
# This script will replace any and all occurrences of the backend URLs with what the
# env vars HOSTHTTPS and HOSTSSL are. The app itself does some self env checking based
# on whether it is loaded from zinfra.io or wire.com; that needs fixing!
#

hosthttps=${HOSTHTTPS:-'staging-nginz-https.zinfra.io'}
hostssl=${HOSTSSL:-'staging-nginz-ssl.zinfra.io'}

echo "Running the webapp pointing at: ${hosthttps} and ${hostssl}"

find /src/aws/static/min -type f -exec sed -i "s/staging-nginz-https.zinfra.io/$hosthttps/g" {} \;
find /src/aws/static/min -type f -exec sed -i "s/staging-nginz-ssl.zinfra.io/$hostssl/g" {} \;

cd /src/aws && python application.py
