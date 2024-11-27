# Dockerfile (front_auth/Dockerfile)

# Utiliser une image Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu du projet Angular
COPY . .

# Exposer le port utilisé par l'application Angular (par défaut 4200)
EXPOSE 4200

# Lancer l'application Angular en mode développement
CMD ["npm", "run", "start"]
