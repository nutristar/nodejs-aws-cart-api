FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER node
EXPOSE 4000
ENTRYPOINT [ "node", "dist/main.js" ]