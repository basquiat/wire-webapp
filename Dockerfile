FROM node:10-alpine

# For some extra dependencies...
RUN apk add --no-cache dumb-init git python gcc make linux-headers libc6-compat bash

# This is required to build some of the webapp modules
RUN echo '{ "allow_root": true }' > /root/.bowerrc

COPY . /src
ENV NODE_PATH=/src/node_modules
ENV PATH=$PATH:/src/node_modules/.bin
WORKDIR /src
RUN yarn && yarn deploy-travis-prod

# For runtime
RUN apk add --no-cache python-dev py-pip build-base

# TODO: How can this be fixed
EXPOSE 5000

# Start the app
WORKDIR /src/aws

# For runtime, it needs a few extra packages
RUN pip install -r requirements.txt

ENV HOSTHTTPS staging-nginz-https.zinfra.io
ENV HOSTSSL staging-nginz-ssl.zinfra.io

ENTRYPOINT ["/bin/bash", "/src/run.sh"]
