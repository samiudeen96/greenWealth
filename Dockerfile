########################################
# 1️⃣ Build Next.js App
########################################
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install

COPY . .

RUN npm run build


########################################
# 2️⃣ Build Nginx Image + Next.js Output
########################################
FROM nginx:alpine AS runner

WORKDIR /app

# Copy Nginx configuration
COPY nginx.conf /nginx-greenwealth/nginx/nginx.conf

# Copy Next.js standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80

# Run Nginx in foreground AND Next.js at same time
CMD sh -c "node server.js & nginx -g 'daemon off;'"

