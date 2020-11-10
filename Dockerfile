# ---- Base Image ----
FROM node:alpine AS base
WORKDIR /opt/tplink-monitor

COPY package.json .


# --- Dependency image ---
# install node prod modules etc.
FROM base AS dependencies

COPY tsconfig.json .
COPY src/ src/

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules

# fix missing python for node-sass
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet

# build server
RUN npm install typescript -g
RUN tsc

# install and build client
RUN cd src/client/ && npm install
RUN cd src/client && npm run build
RUN mv src/client/build/ /opt/tplink-monitor/build/client/

# ---- Release ----
FROM base as release

COPY --from=dependencies /opt/tplink-monitor/prod_node_modules/ ./node_modules/
COPY --from=dependencies /opt/tplink-monitor/build/ .

EXPOSE 3000
CMD ["npm", "start"]
