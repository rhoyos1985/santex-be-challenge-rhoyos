# Santex Be Challenge RIchard Hoyos

## Overview

This project is a REST API that allows users to find teams and players from a league; this project uses an API call [Football-Data](https://www.football-data.org) to get all the information related to teams leagues, and players.

The API was created using NodeJS and Typescript to have more control declare variables and the values that return the functions.

This API use MongoDB as database NoSQL because allow to have saved information as JSON document so this help with the queries and filters using mongoose for this propose. The configuration in docker-compose it's not complicated, and it's not necesary to do a lot in order to run. 

Others Libraries used in the project are
- express: Minimal infrastructure for NodeJS applications.
- Jest: Tools for creating the unit test.
- mongoDB: Connection driver to the Mongo Database
- Mongoose: Easy schemas configuration and method to work in the database
- winston: Easy configuration to show the logs.

## How to run the project 

This project use docker and docker-compose so it's very easy to start the project; it's just necessary to run some commands to set up and work with this API.

1. Clone the repository [santex-be-challenge-rhoyos](https://github.com/rhoyos1985/santex-be-challenge-rhoyos)
2. Create free account in [Football-Data](https://www.football-data.org)
    2.1. Change the variables 
    ```
    AUTH_API_TOKEN =      - Receive this token in the email it used to create the account.
    CODE_FOOTBALL_VALIDS= - This variables has the code allowed in your account.
    ```
3. Install [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) (Skip this step if installed).
4. Create the container ```docker-compose build --no-cache```
5. Run container ``` docker-compose up -d  ```
   ```
    // list the services
    docker-compose ps
    // list the containers
    docker ps
    // stop services
    docker-compose stop
   ```
6. Open postman or other API client.
7. API run in port 4000 ```http://localhost:4000```

## Endpoints

| Path | Params | Description | 
| :---: | :---: | :---: | 
| /import-league/:code | code | First step to use the API import the league to the database | 
| /league/:code | code | Get all the information about the competition |
| /league/:code/teams | code | Get all the information about the teams | 
| /league/:code/players | code | Get all players of a competition |
| /league/:code/players?teamName | code teamName | Get all players of a competition, and optional filter by team |
| /league/team/:teamName | teamName | Get all the information about the team | 
| /league/team/:name/players | name | Get the information about the palyers of a team |
