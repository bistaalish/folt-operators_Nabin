# --- Step 1: Build the React app ---
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of project
COPY . .

# Build the production bundle
RUN npm run build

# --- Step 2: Serve using Nginx ---
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build files from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose container port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
