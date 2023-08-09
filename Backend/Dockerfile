# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend code
COPY . .

# Expose the port your backend is listening on
EXPOSE 3001

# Command to start your backend
CMD ["node", "index.cjs"]