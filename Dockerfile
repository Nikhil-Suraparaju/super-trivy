# Intentionally using outdated Node base image for demo vulnerability scanning
FROM node:14.17.0

# Running as root (intentionally insecure)
USER root

WORKDIR /app

# Intentionally copying everything including .env files
COPY . .

# Installing dependencies without audit
RUN npm install --legacy-peer-deps

# Intentionally exposing sensitive port without restriction
EXPOSE 3000

# Intentionally using npm start without a non-root user
CMD ["npm", "start"]
