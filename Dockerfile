# Use Node.js
FROM node:20

# Set working directory
WORKDIR /app

# Copy entire project
COPY . .

# Install dependencies (frontend + backend)
RUN npm run install-all

# Build frontend and move to backend/dist
RUN npm run build

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]


