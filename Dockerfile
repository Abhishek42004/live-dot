# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application
COPY . .

# Copy .env file
COPY .env ./

# Expose the port
EXPOSE 80

# Start the application with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
