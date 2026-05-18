FROM node:20-alpine

WORKDIR /app

# Copia manifestos primeiro para aproveitar cache de camadas
COPY package.json package-lock.json ./

# Instala apenas dependências de produção
ENV NODE_ENV=production
RUN npm ci --omit=dev

# Copia o resto dos arquivos
COPY . .

# Ajusta permissões e roda como usuário não-root (imagem oficial já tem 'node' user)
RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["npm", "start"]