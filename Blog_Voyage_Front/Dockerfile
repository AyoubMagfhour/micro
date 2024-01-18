# Use an official Node runtime as a base image
FROM node:14.15.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the local package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local source code to the container
COPY . .

# Build the application
RUN npm run build

# Use Nginx as a lightweight base image for serving static files
FROM nginx:1.21.1-alpine

# Copy the built artifacts from the builder stage to the Nginx image
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]
