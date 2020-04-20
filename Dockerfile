FROM node:alpine
WORKDIR /opt/tplink-monitor
COPY . .
RUN npm install
RUN npm upgrade
RUN npm audit fix -force
EXPOSE 3000
CMD ["npm", "start"]