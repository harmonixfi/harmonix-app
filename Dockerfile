FROM node:lts as dependencies

WORKDIR /my-project

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

FROM node:lts as builder

WORKDIR /my-project

# Copy the rest of the application files to the working directory
COPY . .

# Argument to choose environment (default to 'production')
ARG NODE_ENV=production

# Copy the appropriate .env file based on the NODE_ENV argument
COPY .env.${NODE_ENV} .env

# Build the Next.js app
RUN npm run build

FROM node:lts as runner
WORKDIR /my-project

# Copy built files and dependencies from the build stage
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/.env ./.env

EXPOSE 3000
# Set the command to start the Next.js app
CMD ["npm", "start"]
