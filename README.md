<div align='center'>

<h1>audioFile API</h1>
<p>audioFile backend</p>

</div>

# :notebook_with_decorative_cover: Table of Contents

- </span>
  <a href="https://github.com/jenikashannon/audioFile/blob/master/README.md">
  audioFile Documentation </a> <span>
- [About the Project](#star2-about-the-project)

## :star2: About the Project

### :space_invader: Tech Stack

<details> <summary>Client</summary> <ul>
<li><a href="">JavaScript</a></li>
<li><a href="https://axios-http.com">axios</a></li>
<li><a href="https://nodejs.org/en">Node</a></li>
<li><a href="https://www.php.net/manual/en/function.uniqid.php">uniqid</a></li>
<li><a href="https://knexjs.org">Knex.js</a></li>
<li><a href="mysql.com">MySQL</a></li>
<li><a href="https://expressjs.com">Express</a></li>
</ul> </details>

## :toolbox: Getting Started

### :bangbang: Prerequisites

- Install Node JS on your computer<a href="https://nodejs.org/en/download">
  Here</a>
- Install MySQL on your computer

### :running: Run Locally

Clone the project

```bash
https://github.com/jenikashannon/audiofile-api
```

go to the project folder

```bash
cd <path-to-project-folder>
```

install dependencies

```bash
npm install
```

create database and fill out .env file

```bash
reference .env-sample

adjust DB settings to match your machine

copy REDIRECT_URI as is

get CLIENT_ID and CLIENT_SECRET from Synapse

PORT and JWT_KEY may be customized to your liking
```

add tables to database

```bash
npx knex migrate:latest
```

add demo data to tables

```bash
npx knex seed:run
```

start server

```bash
npm start
```
