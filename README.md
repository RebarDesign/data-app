# Data App

*Coding assignment for Front End Developent assesment*

## Table of Contents
  1. [TL;DR](#tl-dr)
  1. [Task](#task)
  1. [Technologies](#technologies)
  1. [Approach](#approach)
  1. [How to use](#how-to-use)
  
## TL-DR

This is the short desription of this readme file, with a brief overview of the creative and development process. 

I first started with breaking down the task into sections. I decided to split it into 2 sections (Publishing and Reach).

Then for each of these I put down the sets of goals, and the basic functions the app should be able to do by the end.

I then proceded to make a diagram of how the pieces would fit together, and wrote down the enpoints and routes I would use.

I also put the JSON data in a visual parser and started thinking how the data could be used, what information was relevant, and what we could discard. 
I made some paper sketches on how the chart would have to look, and what the best way to display the data would be. As the timestamps are identical for most of the items, a choronological order would not make sense, but more the ratio of their properties, and I decided to leave the choronological display more as a secondary feature, as it was tied to the index of the elements.  

Afterwards, I decided to look for the technologies I will need to use ( and the required ones ). For the server side, I decided to use ExpressJS 4. Although I was more familiar with E3.* I thought this would be a good exercise to get to know E4 a bit better. 
I used the Express generator to save some time, and replaced the views with html instead of jade.

I created the first routes that collected the JSON data and plugged them into the server.  

I then moved on to the front end and used bower to install the required dependencies. I then retrieved using a factory the data from the server, and rendered the basic data in the view. 

In the published data section, I first displayed the data of each item, then formated it and added the actions to manipulate each element on the ui. 
In the reach data section, I started with a basic bar chart, and the proceeded to add complexity, and different ways in which the user could manipulate it. 

I ended with adding some UI elements for readibility, used the less source from bootstrap, as well as my own less style file, which I ran through a gulp task manager. 

I finished with removing all the debug information from the app - $log, angular debug information and server debug information.

## Task

### Data sources:

  - [Publishing](https://jsonblob.com/api/jsonBlob/55683150e4b03d338bd86998)  
  - [Reach data](http://jsonblob.com/api/jsonBlob/5208a709e4b002188ed03bdd)

### Description:

  - Setup up a webapp with nodejs and angularjs. [http://nodejs.org/](http://nodejs.org/), [https://angularjs.org/](https://angularjs.org/)
  
  - Use Less for all css rules [http://lesscss.org/](http://lesscss.org/)
  
  - Create CRUD REST endpoints for providing json blobs above
  
  - Render the publishing item and enable the ui to create, update and delete items (no validation)
  
  - Make a websocket impl. and when a new publication is created it pushes the data to the ui in real time.
  
  - Make a graph page with a graph rendering the data in the reach graph (using d3.js)
  
  - Make a websocket impl. and add data points to the reach graph in real time
  
  - Enable the project to be run from “node app.js” on localhost:3000
  
  
## Technologies

**[Back to top](#table-of-contents)**

### Sever:

  - [NodeJS](http://nodejs.org/)
  - [ExpressJS](http://expressjs.com/) (Version 4.*)
  - [Socket.IO](http://socket.io/)

### Client:

  - [Angular](https://angularjs.org/)
     -- Angular-Router 
     -- Angular-Socket-IO
  - [Gulp](http://gulpjs.com/) (gulp-less) 
  - [D3](http://d3js.org/)
  
## Approach

**[Back to top](#table-of-contents)**

I decided to use Express 4.0 for the server side, since it is the latest version, but especially as a exercise to get more familiar with the new breaking changes.

The project can be split into 2 tasks: Processing the Publish Data, and the Reach Data. 

### Published

The Publish data set is a list of items, describing social media? posts and their meta data. The original set has 6 items. 

I decided therefore to create a simple bootstrap ui (using the bootstrap.less source, to follow task guidelines) and render them as simple panels. 

The Publish view will have it's own Controller ( using ControllerAs ). The controller will activate using the data getting factory, which will poll the Express back for the published data on get.('api/publish')

Each published element will probably be rendered as a directive, but while using the view controller scope for simpicity.

Each element has it's own action buttons, that will emit the actions through sockets to the server, which then will notify the other clients of the action and element id.

    
### Reach

The Reach data set will be received by the reach model, through the data factory, and will then be processed in the controller. 

The chart is created in the controller, as it is designed for single use. On socket update of added data, the updateChart function is called with the new item as a parameter.

You can add new data using the Add Data form. 

The chart is default sorted by post value, but can be sorted by index, which is also the chronological order.

#### Workflow

    git init
    
    npm init
    
    express --ejs

    npm install
    
    npm install socket.io --save
    

Created a server folder to hold the api and io modules, as well as the JSON blob assets.

With basic server functionality - server creation, basic socket connection moving on to client side.

Starting work on the front end - Default folder is /public

    cd public 
    
    bower init 
    
Initialize bower in public folder, for instalation of cliend dependencies: Angular, Bootstrap, D3

    bower install angular angular-route bootstrap d3 --save
    

*Note* There are a few angular-socket boilerplates, but using them would only show I can follow instructions, so for the sake of demonstrations, I just used the basic socket.io scripts


In order to compile Less to Css will install Gulp task manager, with a gulp-less component ( in the root directory ) 

    npm install gulp gulp-less
    
Create gulpfile.js 
    
Import bootstrap

Run less to css task

Creating angular structure:

  - app.module.js
  Define app module
  - app.config.js 
  Configure angular router. We need 2 routes : Publish and Reach, which will be nested ui views
  - controllers
  Create controllers for each view
  Create a main controller
  
  Create Services. We need a service to get the published data and the reached data.
  But first we need to create the get api.
  
  Created a api routes for getting the json information
  
  Created Service to get data using the api
  
Testing out socket functionality with a simple name emit, also testing out Express 4 + socket IO integration

First , create a service for the sockets in the front end 
Add socket 'on' and 'emit' on the server side

Server emits the same message, but with the appendix *:out* ex: delete:pub from client , delete:pub:out from server 

Server will broadcast to all other connected clients, using socket.emit.broadcast

Created basic ui add, update and delete functionality in controller. 

*Note* Only the session information is a/u/d from the ui

Reached Data:

  Will create D3 chart in controller. 
  
  First have to get and parse the data
  
  Create a new array with the values we want. 
  
  Plot the index on X and the impressions on Y
  
  Starting work on the UI elements

  Created update chart functionality
  
  Will insert new item in array, then redraw the chart for effect

Published page
  Implement directives

UI
  Simple ui and layout fixes
  
Final
  Remove debug information
    
## How to use

**[Back to top](#table-of-contents)**

Since using Express 4, the start of the app will be done using 

  *Note* To connect from local network, change the socket connection address (localhost) in *sockets.factory.js*
  
  Install node modules 
  ```javascript
  
  npm install
  
  ```
  
  Install bower components in public folder
  ```javascript
  
  cd public
  bower install
  
  ```
  Start application
  
  ```javascript
  node bin/www
  
  // or
  
  npm start
  ```
    
*Note*: I am aware that the task description states the start of the app should be "node app.js" but I feel that more Express 3 functionality. It's easier to separate the modules, and combine them in www/bin, or reusing them somewhere else. 
If it is mandatory, there would be no problem refractoring the start of the app to "node app.js"

Use the UI to add / edit / delete Published items, as well as Add points on the Reach data.
