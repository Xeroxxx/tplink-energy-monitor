# ---- Base Image ----
FROM node:alpine AS base
WORKDIR /opt/tplink-monitor

# ---- Build Image ----
FROM base AS src

COPY tplink-energy-monitor/package.json .
COPY tplink-energy-monitor/package-lock.json .

# fix missing python for node-sass
# do we really need this after migration?
#RUN apk --no-cache add --virtual native-deps \
#  g++ gcc libgcc libstdc++ linux-headers make python

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production --force && npm cache clean --force
RUN mv node_modules prod_node_modules

RUN npm install --quiet --force

COPY tplink-energy-monitor/ .

FROM src as test
RUN npm run lint-all && npm run test-all

FROM src as builder
RUN npm run build-all -- --prod

# ---- Release ----
FROM base as release

COPY --from=src /opt/tplink-monitor/prod_node_modules ./node_modules
COPY --from=builder /opt/tplink-monitor/dist/apps/api-server/ .
COPY --from=builder /opt/tplink-monitor/dist/apps/client/ client/

USER node
EXPOSE 3001
CMD ["node", "main.js"]
