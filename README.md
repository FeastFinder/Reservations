# Project Name

Feast Finder Restaurant Reservation System

## Related Projects

  - https://github.com/FeastFinder/Banner-Gallery
  - https://github.com/FeastFinder/Menu
  - https://github.com/FeastFinder/Reservations
  - https://github.com/FeastFinder/Reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [CRUD API](#CRUD)

## Usage

-Install node using npm install

-Populate mongodb by using seed script

```sh
npm run seed
```

-Start server and webpack

```sh
npm run build
```

```sh
npm run server-dev
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

npm install


## CRUD

### CRUD API Routes

GET /api/:id/reservations
  - retrieves reservation information for specified id
  - Returns an object if successful

POST /api/:id/reservations
  - records a reservation to database
  - returns 200 code if successful

PUT /api/:id/reservations
  - updates reservation at specified id with new information
  - returns a 200 code if successful

DELETE /api/:id/reservations
  - deleted reservation at specified id
  - returns 204 code if successful
