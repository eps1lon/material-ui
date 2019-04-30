#!/bin/sh

set -e

yarn

NODE_PATH=node_modules node /action/lib/run.js