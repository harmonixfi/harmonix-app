FROM node:21 as dependencies

WORKDIR /my-project

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN yarn install --frozen-lockfile

FROM node:21 as builder

WORKDIR /my-project

# Copy the rest of the application files to the working directory
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules

# Argument to choose environment (default to 'production')
# ARG APP_ENV

# Copy the appropriate .env file based on the APP_ENV argument
# COPY .env.${APP_ENV} .env
COPY .env .env

# Build the Next.js app
RUN yarn build

FROM node:21 as runner
WORKDIR /my-project

# Copy built files and dependencies from the build stage
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/.env ./.env
COPY --from=builder /my-project/package.json ./
COPY --from=builder /my-project/package-lock.json ./

EXPOSE 3000
# Set the command to start the Next.js app
CMD ["yarn", "start"]
