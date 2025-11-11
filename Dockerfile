
From node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
    
COPY . .

EXPOSE 8000
ENV NODE_ENV=production

CMD if [ "$NODE_ENV" = "development" ]; then npm run dev; else npm start; fi