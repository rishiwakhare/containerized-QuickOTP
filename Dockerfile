# Use official Nginx Image
FROM nginx:alpine  

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy static files to Nginx Web Directory
COPY ./usr/share/nginx/html

# Expose PORT 80 
EXPOSE 80

# Start the nginx 
CMD ["nginx", "-g", "daemon off;"]
