Ludum Dare 29
=============

Getting started
---------------

### Install NodeJS

The simplest way to install NodeJS is with the binary hosted on http://nodejs.org. Get it!

### Intsall Bower & Grunt

`$ sudo npm install -g bower grunt-cli`

### Install node dependencies

`$ npm install`

### Install bower dependencies

`$ bower install`

### Run it!

`$ grunt`

Deploying to heroku
-------------------

Heroku doesn't like to host static content, so we're going to trick it into hosting
our static single-player game as a PHP site.

### Build the project

`$ grunt build`

### Init a new git repository

```
$ cd ./dist
$ git init`
```

### Heroku Create!

`$ heroku create`

### Deploy that sucker

```
$ git push heroku master
$ heroku ps:scale web=1
```
