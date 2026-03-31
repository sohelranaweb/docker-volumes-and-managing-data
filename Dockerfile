FROM node:20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# VOLUME ["/app/logs"]
# anonymus volumes
# we are telling that bro hook the folder name of the container with the host machine

EXPOSE 5000

CMD ["npm", "run", "dev"]