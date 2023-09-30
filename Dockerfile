FROM node:18-alpine

RUN apk update

RUN mkdir /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
  && chown appuser:appgroup /app

USER appuser

WORKDIR /app

COPY package.json .

COPY .env .

RUN npm install

COPY /dist .

EXPOSE 3000 3333

CMD ["node", "main"]