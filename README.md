<img src='https://cdn.techinasia.com/wp-content/uploads/2015/06/kickstarter-logo.jpg'>

Table of Contents
-----------------
- [Description](#Description)
- [Getting Started](#Getting-Started)
  * [Dependencies](#Dependencies)
  * [Set up](#Set-up)
- [Database Schema](#Database-Schema)
- [Application Demo](#Application-Demo)

Description
-----------
This is a clone application designed to mimic the recommended component of Kickstarter! This application was designed with React Hooks, Express, and MongoDB.

Getting Started
---------------

### Dependencies
- Node >= v6.13.0
- Mongo v4.4.0

### Set up
1. If you do not have MongoDB installed, follow the instructions [here](https://docs.mongodb.com/manual/installation/).
2. Go to https://unsplash.com/developers and register as a developer.
3. Generate a `config.js` in the root directory. Export out an object like so `{ "token": API_KEY}` where `API_KEY` is the access key.
4. Run `npn run seed` to seed the database with random image links.
5. Run `npm run react` to compile all public files into a bundle.
6. Run `npm run server` to serve up the files at port 3001.

Database Schema
---------------
<img src='https://i.imgur.com/XWZcEMS.png' width=300 height=150>

Application Demo
----------------
### Application recommended component
<img src='https://i.imgur.com/mgmfnfS.png'>

### Kickstarter recommended component
<img src='https://i.imgur.com/hbbn4Sp.png'>
