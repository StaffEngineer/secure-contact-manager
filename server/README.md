# Secure Contact Manager backend app

## Running app

1. `npm i`
2. `npm run build`
3. `STORE='./store' node dist/index.js`

## TODO

* add unit tests (consider using `jest`)
* validation of payloads (consider using `express-validator`)
* add proper authentification between frontend and backend (consider using JWT)
* instead of saving data directly to a file consider using database (e.g. `sqlite`, `postgresql` or `mongodb`)
