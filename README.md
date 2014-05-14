angoose-demo
============

This is a demo app intended to showcase the angoose features (and some of its resuable extensions).  You may clone
this app and run it for the purpose of understanding how angoose works, or even use it as a start point of building 
your own angular/node/mongo based app.

Prerequisites
=============
* node.js installed
* MongoDB installed and running

Get Started
============

1. git clone https://github.com/tjworks/angoose-demo.git
2. npm install
3. node server
4. Point your browser to http://localhost:8080


Demo Contents
===============

Backend 
----------
**server.js**

Node app script. Mainly used to set up the angoose configuration and routes for serving the html

**server/models/Todo**

This is the sample "business" model. You may put more model files here.

Front End
---------
 
**public/demo-app.js**

angular main/app script. Setting up angular dependencies, login controller, and exception handlers etc. 

**public/controllers/todo.js**

Angular controller script for the "Todo Test" page. Here you can see Angoose in action. Notice the use of direct invocation of mongoose model method such as todo.save(), as well as `Todo.$query`, 
an angular wrapper over mongoose's Model.find()



Angoose Forms & Angoose Authorization
--------------------------------------

The demo site, while small, includes the basic user authentication and permission control, as well as an automatic mongoose admin UI interface. All these pages only required a few simple
scripts mentioned above(A node app script, Todo model file, angular app script, and angular controller script for Todo). These are made possible by two Angoose extensions:
 
* [Angoose Forms ](https://github.com/tjworks/angoose/wiki/Angoose-Forms)
* [Angoose Authorization](https://github.com/tjworks/angoose/wiki/Authorization-Extension)  


      



