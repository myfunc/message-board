FROM node:18 as development
RUN    apt-get install bash

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:$PATH

WORKDIR /usr/src

ARG PORT
ARG API_URL
ENV PORT="$PORT"
ENV REACT_APP_API_URL="$API_URL"

COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/bin/bash", "/usr/src/entrypoint.sh"]
