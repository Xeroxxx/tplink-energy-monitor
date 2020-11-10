# ---- Base Image ----
FROM node:alpine AS base
WORKDIR /opt/tplink-monitor

COPY package.json .


# --- Dependency image ---
# install node prod modules etc.
FROM base AS dependencies

WORKDIR /opt/tplink-monitor

COPY tsconfig.json .
COPY src/ .

RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
RUN cp -R node_modules prod_node_modules
RUN npm install
RUN npm install typescript -g

RUN tsc
RUN cd src/client/ && npm run build
RUN mv src/client/build/ /opt/tplink-monitor/build/client/

# ---- Release ----
FROM base as release

COPY --from=dependencies /opt/tplink-monitor/prod_node_modules/ ./node_modules/
COPY --from=dependencies /opt/tplink-monitor/build/ .

EXPOSE 3000
CMD ["npm", "start"]
