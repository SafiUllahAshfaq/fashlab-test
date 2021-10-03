FROM node:14-alpine
RUN mkdir -p /usr/server
WORKDIR /usr/server
COPY package.json /usr/server/
RUN npm install
COPY . /usr/server
EXPOSE 4000
CMD ["npm", "run", "dev"]