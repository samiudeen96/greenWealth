########################################
# 1️⃣ Build Next.js App
########################################
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build


########################################
# 2️⃣ Nginx + Next.js Runtime
########################################
FROM nginx:alpine AS runner

WORKDIR /app

COPY nginx-greenwealth/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 80

CMD sh -c "node server.js & nginx -g 'daemon off;'"
