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


# Copy SSL certificate files
COPY ./unbelong/private.key /app/private.key
COPY ./unbelong/certificate.crt /app/certificate.crt
COPY ./unbelong/ca_bundle.crt /app/ca_bundle.crt


# Copy .env file
COPY .env ./

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# Start the application with PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
