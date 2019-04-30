#!/bin/sh

set -e

cd actions/preview-links

yarn

node lib/run.js