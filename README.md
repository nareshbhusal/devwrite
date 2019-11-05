# DevWrite
DevWrite is a blogging platform for developers.
[See live](http://devwrite.nareshbhusal.com)

## Goal
I developed devwrite and [repass](https://github.com/repass) to learn server side development with nodejs. The goal was to play around with and learn different aspects of server side development by adding a bunch of features.
Development period for devwrite and repass was collectively ```>120 hours```

### Technologies used
```reactjs```, ```nodejs```, ```postgresql```

---

## Installation
### Install dependencies
```
npm install && cd client && npm install && cd ../server && npm install
```

### Configure environment
#### Add env files
```
cd client && touch production.env development.env
cd server && touch production.env development.env
```

#### Set environment variables
##### In client/
```
URL=http://<server_ip>:<server_port>
```

##### In server/
```
PORT=server_port
DB_NAME=database_name
DB_USER=postgresql_username
DB_PASS=postgresql_username_password
SESSION_SECRET=secret_character_string_for_redis
```

##### Database tables
Create database for devwrite and add tables. Database models are here -
```
cd server/src/models/ && ls
```

### Run dev mode
```
npm run dev
```

### Run in production mode
```
npm run prod
```

## Features

#### Users can - 
  * Create and edit posts and comments
  * Like posts and comments
  * Save posts
  * Follow other users
  * Edit their info to add bio, website and avatar image
 
#### Sorting
Posts can be sorted by ```new``` or ```top```.

#### Search
Search gives an ability to search posts by keywords in title of the posts.

#### Tag
Tag-cloud on the right side in the desktop view is the list of most used tags. You can filter posts with tags.

#### Infinite scrolling
Scrolling to the bottom automatically fetches new posts.
