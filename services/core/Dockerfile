FROM node:18 as development
RUN apt-get install bash

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH /root/.yarn/bin:$PATH

WORKDIR /usr/src

ARG PORT
ENV PORT="$PORT"

COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/bin/bash", "/usr/src/entrypoint.sh"]
