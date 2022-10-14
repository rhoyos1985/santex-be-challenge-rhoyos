FROM node:16-alpine
WORKDIR /app

#ARG ENV
#COPY .env.${ENV} ./env.sh
COPY package*.json .
COPY tsconfig.json .
COPY src/ ./src

RUN npm install
RUN npm run build

EXPOSE 4000
#ENTRYPOINT ["/bin/sh", "-c", "source env.sh && \"$@\"", "-s"]
CMD ["npm", "run", "server"]