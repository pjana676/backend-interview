# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the API will listen on
EXPOSE 3000

# Run migrations
# RUN npx sequelize-cli db:migrate

# Run the seeder
# CMD /bin/sh -c npx sequelize-cli db:seed:all
RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
ENTRYPOINT [ "./startup.sh" ]

# Start the API server when the container starts
# CMD ["npm", "start"]
