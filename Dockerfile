FROM node:12-alpine

ENV REACT_APP_API_URL=${REACT_APP_API_URL}

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install --silent

EXPOSE 3000

COPY . ./

CMD ["npm", "start"]