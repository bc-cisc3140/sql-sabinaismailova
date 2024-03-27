This directory contains a sample API endpoint, using NodeJS and ExpressJS.

The server API endpoints are stored in `server.js` and uses the `billboard.db` file.

# Setup

Run `make setup-db` to set up the sqlite database file. Run this the first time you use code from this directory.

Run `make` to start the server locally. You must have the `billboard.db` database for the server endpoints to function correctly.

# Exercises

Some exercises to try include: 

* [ ] add API endpoint(s) for inserting new data
* [ ] add more API endpoints for updating table structure 
* [ ] allow case insensitive searching
* [ ] enable searching a range (i.e. top 10; top 20)
* [ ] add a feature to endpoints to allow ranking ascending or descending order

