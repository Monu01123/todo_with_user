# Use Node.js official image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend server port
EXPOSE 8080

# Set environment variables (optional)
ENV NODE_ENV=production
ENV MONGO_URI=<your-mongo-db-uri>
ENV JWT_SECRET="ldfkgjsdlkgjdsflkjglkdfg"
# Start the server
CMD ["npm", "start"]
