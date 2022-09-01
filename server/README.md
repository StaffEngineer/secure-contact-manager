# Secure Contact Manager backend app

## Running app

1. `npm i`
2. `npm run build`
3. `STORE_PATH='./store' node dist/index.js`

Consider running backend with prefilled store to see a scrollable contact list using: `STORE_PATH='./test_store' node dist/index.js`. Password is `password1`.

## TODO

* add unit tests (consider using `jest`)
* validation of payloads (consider using `express-validator`)
* add proper authentification between frontend and backend (consider using JSON Web Token)
* instead of saving data directly to a file consider using database (e.g. `sqlite`, `postgresql` or `mongodb`)
