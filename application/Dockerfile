FROM node:13.12.0

WORKDIR /home/node/application

ADD "./package.json" "/home/node/application/package.json"

RUN ["npm", "install"]

CMD ["npm", "start"]