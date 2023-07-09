FROM node:16-alpine as build-stage
WORKDIR /app/
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn run build

FROM node:16-alpine
WORKDIR /app/
COPY --from=build-stage /app/ .
EXPOSE 3003
CMD ["yarn", "run", "dev"]