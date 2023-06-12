# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the entire project to the working directory
COPY . .

# Install project dependencies
RUN npm ci

# Build the React app
RUN npm run build

# Expose a port for the container
EXPOSE 4173

# Define the command to run the app
CMD [ "npm", "run", "preview"]
