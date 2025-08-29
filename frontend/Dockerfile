FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy frontend assets
COPY index.html .
COPY css ./css
COPY js ./js

EXPOSE 80