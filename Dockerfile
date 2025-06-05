# Étape 1 : Image de base officielle Node.js
FROM node:20

# Étape 2 : Création et configuration du répertoire de travail
WORKDIR /app

# Étape 3 : Copie des fichiers
COPY . .

# Étape 4 : Installation des dépendances si package.json existe
RUN if [ -f package.json ]; then npm install; fi

# Étape 5 : Exposition du port (par défaut 3000 dans index.js)
EXPOSE 3000

# Étape 6 : Lancer l'app
CMD ["node", "index.js"]