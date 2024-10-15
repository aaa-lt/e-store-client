FROM node:20-alpine AS build
ARG VITE_API_BASE_URL
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist
EXPOSE ${VITE_PORT:-8080}
CMD ["sh", "-c", "serve -s dist -l ${VITE_PORT:-8080}"]