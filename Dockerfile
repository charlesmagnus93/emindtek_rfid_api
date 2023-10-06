FROM node:18-alpine

RUN apk update

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
&& chown -R appuser:appgroup /app

USER appuser

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:dev"]