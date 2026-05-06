# Imagem Nginx Alpine — leve e optimizada para produção
FROM nginx:1.27-alpine

# Remover configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar a configuração personalizada
COPY nginx.conf /etc/nginx/conf.d/app.conf

# Copiar todos os ficheiros estáticos do frontend
COPY . /usr/share/nginx/html/

# Remover ficheiros que não devem estar no servidor
RUN rm -f /usr/share/nginx/html/nginx.conf \
           /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/.dockerignore

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
