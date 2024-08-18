# Specify the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable for PORT
ENV DATABASE_URL="postgresql://FishStore_owner:2hzUZ9VjNCGd@ep-restless-credit-a1q153ov.ap-southeast-1.aws.neon.tech/FishStore?sslmode=require"
ENV JWT_SECRET="Fish_Store"
ENV EMAIL_USER="RoddeeJSD@outlook.com"
ENV EMAIL_PASSWORD="@Rr123456789"
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
