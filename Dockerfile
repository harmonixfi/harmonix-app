ARG NODE_ENV
ARG NEXT_PUBLIC_THIRD_WEB_CLIENT_ID
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS
ARG NEXT_PUBLIC_USDC_ADDRESS

FROM node:lts as dependencies
WORKDIR /my-project
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /my-project
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_THIRD_WEB_CLIENT_ID=${NEXT_PUBLIC_THIRD_WEB_CLIENT_ID}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS=${NEXT_PUBLIC_ROCK_ONYX_USDT_VAULT_ADDRESS}
ENV NEXT_PUBLIC_USDC_ADDRESS=${NEXT_PUBLIC_USDC_ADDRESS}
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /my-project
ENV NODE_ENV=${NODE_ENV}
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]