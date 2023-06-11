# Build frontend
FROM node:14-alpine as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN yarn install
COPY frontend .
RUN yarn build

# Build backend
FROM maven:3.8.3-jdk-11-slim as backend
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/src ./src
RUN mvn package -DskipTests

# Run backend & Serve frontend using nginx
FROM nginx:1.21.1-alpine
COPY --from=frontend /app/frontend/build /usr/share/nginx/html
COPY --from=backend /app/backend/target/*.jar /app/app.jar
EXPOSE 8080
CMD ["sh", "-c", "java -jar /app/app.jar & exec nginx -g 'daemon off;'"]

