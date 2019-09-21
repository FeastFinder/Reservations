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

GET /api/restaurant/:id/reservations
  - retrieves reservation information for specified id
  - Returns an object if successful

POST /api/restaurant/:id/reservations
  - records a reservation to database

PUT /api/restaurant/:id/reservations/:reservation_id
  - updates reservation at specified id with new information

DELETE /api/restaurant/:id/reservations/:reservation_id
  - deleted reservation at specified id
