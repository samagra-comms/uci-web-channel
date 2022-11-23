FROM node:16.14.0 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
COPY yarn.lock ./

# pull Nginx conf files from UCI repo
RUN git clone https://github.com/samagra-comms/docker-deploy.git ./docker-deploy

# copy environment file
COPY .env ./

# Install app dependencies
RUN yarn install
RUN yarn build

COPY . .

FROM nginx

COPY --from=builder /app/build /usr/site
COPY --from=builder /app/docker-deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/docker-deploy/uci-web-channel.conf /etc/nginx/sites-enabled/default