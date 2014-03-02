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

This is the sample "business" model. You may more model files here.

Front End
---------

**public/**

HTML/CSS and front end JS souce

**public/demo-app.js**

angular main/app script. Setting up angular dependencies, login controller, and exception handlers etc. 

**public/controllers/todo.js**

Angular controller script for the "Todo Test" page. Here you can see the use of direct invocation of mongoose model method such as todo.save(), as well as Todo.$query, 
an angular wrapper over mongoose's Model.find()

  
**public/templates/**

Angular template files


 
Angoose Authorization
---------------------

An alpha version of the authorizatoin extension is included in the demo. To activate the extension,  you use the `extensions` configuration when init angoose. 

    var options = {
	    extensions:['angoose-users', 'angoose-authorization', 'angoose-ui'],
	    'module-dirs':  './server',
	    logging:'DEBUG',
	    mongo_opts:'localhost:27017/test',
	    'angoose-authorization':{
	        'model-name':'Role'
	    }
	};    
	require("angoose").init(app, options);


Angoose authorization is a role based permission module that is designed to help you manage the security aspects of your application, 
including API permission, data permission(such as redaction) etc. At this point only API permission is implemented.

**How it works**

When server starts up, the auth module will analyze all the Angoose modules(including mongoose models and service modules) and collect all the published methods(remote methods). 
Each of the `module.method` entry is as a permission resource item which can be granted to an user role. An user can invoke that API if his/her role is explicitly permitted via the
role admin UI(see below). Note admin users(User with role `admin`) will always bypass these permission checks.

**How to define role permission**

The auth module requires another extension `angoose.ui` to help managing the role permissions(included in the demo setup). `angoose.ui` can be considered as an mongoose admin interface
though it can do much more. To access the role permission page, go to "Admin->Manage Permissions" or type URL: http://localhost:8080/deform/role/list

By default the auth module creates 3 default roles: admin, authenticated and guest. There is no need to edit admin role as it has no effect. The `authenticated` role is automatically
added to user after they log in so you can assign permission to this role as a convenience.  You may create more roles that you may need. 

Users are designed to be able to have more than one role assigned however it is currently not handled by the auth module. This will be implemented by an users extension in future. 

**How to add user and assign role to user**

The user management in the demo uses the `angoose-users` extension.  It is a placeholder module that includes a simple user model, and login/logout service. 

This is just for demo purpose and even password is not hashed.  The intension is to easily allow user to plugin their own login module in the future. 

To add an user, go to "Admin -> Manage Users" and create a new user. Specify the role for the user and make sure you add/define the role permissions in above step.

To change the role names, for now just edit `node_modules/angoose/extensions/angoose-users/user-model.js`. It will be supported properly once the `angoose-users` extension is mature.

If, after you logged in as a non-admin user and you found yourself getting "Access Denied" message. Check to verify the user's role has the proper permission for the API used by the page.




 


 

      


Angoose Administrator UI
------------------------

This demo includes an alpha version of the `angoose.ui` extension which provides a back office administrator UI to the mongoose models. For each mongoose model, a set of
automatic angular routes are setup:

* /deform/model-name/list
* /deform/model-name/update/xxxx
* /deform/model-name/view/xxxx

With these automatic routes and corresponding pages, you can perform some simple add/modify/delete/list tasks for the mongoose models. The intention is to make this
administrator UI highly customizable so it can be used elsewhere, not limited to the admin interface. 







