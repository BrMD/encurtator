FROM maven:3.9.9-eclipse-temurin-21 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21
COPY --from=build /target/encurtator-0.0.1-SNAPSHOT.jar encurtator.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "encurtator.jar"]