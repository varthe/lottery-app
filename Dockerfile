FROM node:20
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node", "main.js"]