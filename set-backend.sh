#!/bin/bash

export hostname=$1
for i in app/script/main/auth.js app/script/auth/configureClient.js; do
    perl -i -pe s/kube-staging-nginz-https.zinfra.io/$hostname/g $i
done
