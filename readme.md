# Rancagua Digital Moleculer DB Mixin

## Description

Moleculer Mixin to provide a _MongoDB_ database interface to _[Moleculer](https://moleculer.services)_ microservices.

## Installation

`npm install services-db-mixin`
or
`yarn add services-db-mixin`

## Usage

When defining your _[Moleculer](https://moleculer.services)_ service add the _DBService_ as a mixin:

```javascript
const DBService = require('services-db-mixin')

module.exports = {
  name: '<service-name>',
  version: 1,

  mixins: [
    DbService(
      '<bd-url> or an empty string to use MONGO_URI env var',
      '<collection-name>',
      { version: 1, name: '<logging-service-name>', action: '<service-action-to-call>' }),
  ],
  ...
}
```

_NOTE:_ If you don't pass a database url or don't set the MONGODB*URI env var, This package will use \_moleculer-db MemoryAdapter*.ç
This is usefull for running tests.
