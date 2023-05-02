FROM node:alpine AS builder

WORKDIR /home/node/app

COPY package*.json  .
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:alpine

WORKDIR /home/node/prod

COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/package*.json ./
COPY --from=builder /home/node/app/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
