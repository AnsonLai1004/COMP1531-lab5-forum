#!/usr/bin/env bash

# NOTE: You should copy this file into your lab05_forum repository,
# as that is where you will be deploying from.

WORKING_DIRECTORY="~/www/cs1531forum"

# NOTE: change the credentials below as appropriate
USERNAME="z5361987-forum"
SSH_HOST="ssh-z5361987-forum.alwaysdata.net"

scp -r ./package.json ./package-lock.json ./tsconfig.json ./src "$USERNAME@$SSH_HOST:$WORKING_DIRECTORY"
ssh "$USERNAME@$SSH_HOST" "cd $WORKING_DIRECTORY && npm install --only=production"