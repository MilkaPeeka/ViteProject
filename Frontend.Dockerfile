# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY Frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend code
COPY Frontend .

# Expose the port your frontend is listening on
EXPOSE 9005

# Command to start your frontend
CMD ["npm", "run", "dev"]