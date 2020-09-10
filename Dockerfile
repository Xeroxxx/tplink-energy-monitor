FROM node:alpine
WORKDIR /opt/tplink-monitor

COPY package.json .
RUN npm install
RUN npm audit fix -force

COPY logger-config.json .
COPY src src

EXPOSE 3000
CMD ["npm", "start"]