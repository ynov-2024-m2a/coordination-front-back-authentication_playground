# Dockerfile (front/Dockerfile)
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Serveur léger pour servir les fichiers
FROM nginx:alpine
COPY --from=build /app/dist/front_auth /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
