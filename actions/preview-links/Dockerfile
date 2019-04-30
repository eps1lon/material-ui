FROM node:12-alpine

LABEL com.github.actions.name="Material-UI docs page changes"
LABEL com.github.actions.description="creates deploy preview links to sites affected by a commit"
LABEL com.github.actions.icon="aperture"
LABEL com.github.actions.color="green"

LABEL maintainer="Sebastian Silbermann <silbermann.sebastian@gmail.com>"

COPY lib /action/lib
ENTRYPOINT ["/action/lib/entrypoint.sh"]