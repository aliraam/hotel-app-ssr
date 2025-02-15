# 🏗️ Use official Node.js as base image
FROM node:18-alpine AS builder

# 📁 Set working directory inside the container
WORKDIR /app

# 📦 Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 🏗️ Copy the entire project
COPY . .

# 🏗️ Build the React + Vite SSR app
RUN yarn build

# 📌 Use a lightweight Node.js runtime for production
FROM node:18-alpine AS runtime

# 📁 Set working directory for runtime
WORKDIR /app

# 📦 Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 🏃 Start the SSR Server
CMD ["node", "dist/server"]
