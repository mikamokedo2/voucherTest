FROM node:14.19.0 as dependencies

WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:14.19.0 as builder
WORKDIR /my-project
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build
#RUN yarn run builddocker
#RUN env-cmd -f ./.env.p2p next build

FROM node:14.19.0 as runner
WORKDIR /my-project
ENV NODE_ENV production

ARG addressApi
ENV addressApi=$addressApi
ARG prefixCdn
ENV prefixCdn=$prefixCdn
ARG PARAM_A
ARG PARAM_B
ENV PARAM_A=$PARAM_A
ENV PARAM_B=$PARAM_B


# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "vim"]

EXPOSE 3000
CMD ["yarn", "start"]
