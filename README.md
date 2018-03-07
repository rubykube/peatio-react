# Peatio SDK React/Redux Boilerplate 


## Introduction

This is Peatio SDK React/Redux Boilerplate which aims to describe basics of Peatio API. There are two different ways to serve 
this code: 

* Static SPA with login OAuth on Peatio side, based on defaults of Peatio workbench
* Sepatate OAuth middleware built in

If you have Peatio_workbench running you can start from first option. In this case User will need to open Peatio page first
and after successful login will be redirected to peatio-react.

## Requirements

[Peatio Workbench](https://github.com/rubykube/workbench) up and running. 
Default configuration infrastructure:

* Barong accessible on http://barong:8001/
* Peatio accessible on http://peatio:8000/

For more information please check Peatio Workbench doc.

Current Barong public key should be extracted and put into configuration in order to be able to validate JWT.

This Boilerplate uses [HashRouter](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/HashRouter.md),
so you need to edit Peatio Workbench docker-compose and set callback URL of peatio docker:

```
BARONG_OAUTH2_REDIRECT_URL=http://localhost:4200#/callback
```

## Installation



### Static SPA option

You may use either `yarn` or `npm` to install dependencies:

```bash
cd develop

yarn install

or

npm install
```

Starting in development mode is as simple as:

```
yarn start

or 

npm start
```

You may build code and use any server to handle as static files or even open as file://, but in this case you will need to provide JWT manually. 

```
yarn run build

or 

npm run build
```

There is an example of handling SPA using Go serve in /server-go-example.

Assuming that you already have [golang](https://golang.org/) installed just run following in /server-go-example folder

```
go get -u github.com/fogleman/serve
./start.sh
```

It uses `$GOPATH/bin/serve` if you forgot PATH, you can run it anywhere.

### Separate OAuth middleware option (express.js)

Working directory is `server-express`.

First thing lets add name to our Peatio SDK React/Redux Boilerplate edit `/etc/hosts` and add:

```
0.0.0.0 peatio-react
```

1. Sign in at [barong:8001](http://barong:8001), then go to [/admin](http://barong:8001/admin)
2. and navigate to [Applications](http://barong:8001/oauth/applications)
3. Create new application with the following callback url `http://peatio-react:4200/connect/barong/callback`

### Separate OAuth middleware option (rails)

Working directory is `server-rails`.

First thing lets add name to our Peatio SDK React/Redux Boilerplate edit `/etc/hosts` and add:

```
0.0.0.0 peatio-react
```

1. Sign in at [barong:8001](http://barong:8001), then go to [/admin](http://barong:8001/admin)
2. and navigate to [Applications](http://barong:8001/oauth/applications)
3. Create new application with the following callback url `http://peatio-react:4200/connect/barong/callback`

Put your barong application id and secret to `config/secrets.yml` or set them in env:

```bash
export BARONG_CLIENT_ID=b3b6ceb05a77f2d3f9bd9f8ebdd943c65f415d3329e98380300ea964d4bb3308
export BARONG_CLIENT_SECRET=a00c488eb52ebaaf1b1e38fcf06572ebe84387ce65ffe2f4e01dc45cc626e30f
```

To start the server run `bin/server`. It will build react SPA and start the rails server.

Please, refer to [OAuth2/JWT](docs/auth.md) fot more details.



## Concept of code

Basic configuraion of this demo compatible with Peatio_workbench authentication flow based on OAuth2. 
Peatio SDK React/Redux Boilerplate runs on http://peatio-react:4200 (alias to localhost) the only difference is using HashRouter.

To make code compact this boilerplate uses lightweight front-end framework [dva](https://github.com/dvajs/dva).

3 models are defined:

* auth - handling JWT
* peatioapi - [redux-saga](https://github.com/redux-saga/redux-saga) wrapper around [peatio-sdk](https://github.com/rubykube/peatio-sdk)
* visuals - used for displaing notifications and is not of business logics used to prototype UX flow

For visual parts following libraries were used:

* [uniforms](https://www.npmjs.com/package/uniforms)
* [antd](https://www.npmjs.com/package/antd)


For more details, please read [Development guide](docs/develop.md)