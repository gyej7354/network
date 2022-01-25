
# Social Network playground

## Overview
This projets is a playground to use:
- NodeJS
- Neo4J database
- OpenApi generator for REST API

Users have activity.
The objective is:
1. to POST users
2. to POST activities
3. to link activity to users
4. to retreive activities with users interested by this activity

Next step will be to write the front-end that will use the API.

### Prerequisites

The code was written under **macOS**, so assuming all should work smoothly on Linux-based computers.

You need **Docker** installed.

## Running the server
### Start Neo4J database

```
cd server
npm run startDevDB
```



### Start the server

```
npm run start
```

### Check Swagger and Neo4J browser

The Neo4J browser is [Here](http://localhost:7474/browser/)

You should change the neo4J user password to the one that is in ***config.js*** file.

The swagger is [Here](http://localhost:8080/api-docs/#/)

You should try to POST users, activity, link users to activities and GET activities.

The API end point is [Here](http://localhost:8080/api/v1/)



### Tests

```
cd server
npm run test
```


## Development

### API endpoints

- ***/openapi-generator/openapi.yaml*** - This is the OpenAPI contract to which this server will comply. 

You can modify this file, then run

```
cd openapi-generator
npm run generate
```

Check with Git if no files that you wrote where erased by this command.

Files you dont want to generate must be in ***server/.openapi-generator-ignore***

Before going forward, one should check the Tests are ok
```
cd server
npm run test
```



### 'Clean' Architecture

routes -> controler  -> service -> providers

- the controler checks incoming requests
- the service uses providers to retreived data
- Providers get this data in a local model shape: simple objects with attributes
- the service should map those objects to the format required for the API responses ( using ***server/core/xxxMapper.js*** files)

