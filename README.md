# Introduction

Bird Branch is a digital glossary for North American bird info lookups. If you make an account, you can also create a "bird watchlist" and track your sightings of each bird you find.

---

# Where does the bird info come from?

I found a list of North American birds from NatureServe. Using that list, I looked up each of 1172 bird species and subspecies on Wikipedia and extracted their data from those pages.

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install`

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 4000 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---