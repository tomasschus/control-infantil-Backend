# nodejs-secure restful-api with jwt web-Token

### Pre requisites

* Node
* npm
* Express
* jsonwebtoken
* mongoose
* swagger-ui-express

How to create a RESTful CRUD API using Nodejs?

And how to secure our API with JWT Web-Token?

API using mongodb as the database.

With this code, we can check our user and password and pass back a token in a JSON response. 
We are using mongodb to register the user and jsonwebtoken to create the token.


### Clone

- Clone this repo to your local machine using [https://github.com/Abdurraheem/REST-API-JWTWEB-TOKEN.git]

### Setup

> now install npm and packages

```shell
$ npm install
$ bower install (if require)
```

### Start app

Run project using following commands:

```shell
$ npm run start
```

or

```shell
$ node app.js
```


## Documentation using SWAGGER (*.yml extension)

Open the PATH below in your browser:

> http://localhost:4000/api-docs/


1. Just open link bellow and import in your Postman app

swagger.yml [https://github.com/tomasschus/control-infantil-Backend/blob/master/swagger.yml]


2. You can open and render yml extension as well

Swagger editor online [https://editor.swagger.io/]


## Documentation using Postman (*.json extension)

DigiControl.com collection was export as a JSON file using the recommended version: *Collection v2.1*

Or just open link bellow and import in your Postman app

- DigiControl.com collection

[https://github.com/tomasschus/control-infantil-Backend/blob/master/postman/DigiControl.com.postman_collection.json]


## Running the tests

It consist of a User model and controller. The model
defines the data, and the controller will contain all 
the business logic needed to interact with the database. 

It has a db file which will be used to
connect the app to the database, and an app file used
for bootstrapping the application itself.

The server file is used to spin up the server and tells the
app to listen on a specific port.

Let’s test this out. Why not?
Open up your REST API testing tool of choice, I use Postman or Insomnia, but any will do.

Go back to your terminal and run node server.js. If it is running, stop it, save all changes to you files, and run node server.js again.

Open up your REST API testing tool of choice, I use Postman or Insomnia, but any will do.

Go back to your terminal and run node server.js. If it is running, stop it, save all changes to you files, and run node server.js again.

Open up Postman and hit the register endpoint (http://localhost:4000/api/users). Make sure to pick the POST method and x-www-form-url-encoded.
Now add some values to create your user.

> {
>     "name": "Test",
>     "surname": "Test",
>     "dni": "1122334455",
>     "email": "test@uade.edu.ar",
>     "password": "UADE",
>     "telephone": "1155995599"
> }

See the response? The token is a long jumbled string. 

To try out the http://localhost:4000/api/users endpoint, first copy the token. Change the URL to http://localhost:4000/api/users , and the method to GET.
Now you can add the token to the request header.

You will get list of users...

Try to update users the http://localhost:4000/api/users endpoint, and the method to PUT with x-www-form-url-encoded.
Now change some values you add before.

> {
>     "name": "Andrea",
>     "surname": "Rojas",
>     "dni": "1122334455",
>     "email": "email_de_pruebas@uade.edu.ar",
>     "password": "PASSWORD",
>     "telephone": "1155995599"
> }

Delete some users hit http://localhost:4000/api/users/{_id} endpoint with the method DELETE.

##Disclaimer: The logout endpoint is not needed. The act of logging out can solely be done through the client side. A token is usually kept in a cookie or the browser’s localstorage. Logging out is as simple as destroying the token on the client. This /logout endpoint is created to logically depict what happens when you log out. The token gets set to null.

More details, open SWAGGER or Postman, as you prefer and check out what you need!

Thanks!

:)