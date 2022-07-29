# Canal Media
This is a project of a demo application called `Canal Media` which presents video resources.

## Setup project

Clone the project
```
git clone git@github.com:trogalsk/canal-media.git

cd canal-media
```
Install packages
```
yarn install
```
Run project
```
yarn dev
```
Aplication will be avialble under `http://localhost:3000`

## Architecture
The application is based on the `NextJS` framework and `ReactJS` library using `TypeScript`.

### Code formatting and syntax validation
`ESlint` and `Prettier` were used to check the syntax of the code and its formatting.
To make eslint errors visible, run:
```
yarn lint
```
* Note: there are three warnings left in the code

To format the whole code, run:
```
yarn format
```

### Unit tests
For unit tresting `Jest` and `@testing-library/react` were configured in the application.
Use this command to run unit tests:
```
yarn test
```

### Third party components

- `axios`
Library for HTTP requests

- `@reduxjs/toolkit`
Redux Toolkit to setup application store

- `react-slick` and `slick-carousel`
To render media lists

## Additional possibilities

* Thanks to the use of the NextJS framework, it is possible to use server side rendering (SSR) to improve the SEO of the application.

* Eslint can be used in Continuous Integration system (CI) to validate the application code.

* Add Husky to improve commits
