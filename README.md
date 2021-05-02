# Socialley 💬

A Discussion Alley for the smart socials.

## LIVE SITE: https://socialley.netlify.app/

## Development Guide

### Spinning up local dev setup

- Socialley uses Node.js + Express as backend. Run the below commands in the root of your clone.
```
npm install
node server.js
```
This should start the server on `PORT 8080`

- React.js is used for the Client Side. Setup the local React env by running below commands

```
cd client && npm install
npm start
```
This should start the client on `PORT 3000`

- Setup Environment Variables

For connect MongoDB database, create a .env file in the root of the repository and add:
```
MONGODB_URI = "create-your-own-mongo-db-uri"
```

For client side, create a .env file in the `/client` folder of the repository and add:
```
REACT_APP_AUTH0_DOMAIN=socialley.jp.auth0.com
REACT_APP_AUTH0_CLIENT_ID="create-your-own-client-on-auth0"
```

### **Contributing to Socialley** 🚀
**Socialley** is truly Open Source. Any sort of contribution to this project are highly appreciated 💖 Please refer the [contributing guide](./CONTRIBUTING.md) for more insights upon how to contribute to **Socialley**.

## **License** 

This project is licensed under the terms of the
[MPL-2.0](/LICENSE)

## Developed with 💖 by **Team Axios** 💻:
* [Rohit Dhatrak](https://github.com/RohitDhatrak)
* [Prerana Nawar](https://github.com/prerana1821)
* [Soham Shah](https://github.com/sohamsshah)

