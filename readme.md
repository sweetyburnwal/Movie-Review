# Welcome to Movie-Review Project

### Node Installation
`brew install node`

### Install dependencies
`npm install`

### Change directory
`cd <path to service>`

### Install Database
`brew install postgresql`

### Start database
`brew services start postgresql`

`psql postgres`

`CREATE a role YOUR_USERNAME  with login password YOUR_PASSWORD`

### Create database named movie
`This database will have two tables`
`movie table ->`

`id, name, releaseDate, createdAt `

`where id(integer) = unique movie id,`

`name(string) = movie name,`

`releaseDate(timestamp) = movie release date,`

`createdAt(timestamp) = time at which movie got added in the database`

`review table ->`

`id, movieId, userId/UserEmail, star(Enum, [1, 2, 3, 4, 5]), comment,createdAt`

`where id(integer) = unique review id,`

`movieId(integer) = id of the movie from the movie table which has been reviewed by the user,`

`email(string) = email of the user(which is unique) who has reviewed the movie,`

`star(enum string) = rating for the movie which is given by the user,`

`comment(string) = review submitted by the user for the movie(optional),`

`createdAt(timestamp) = time at which comment was added in the table`

### Run project

`npm run dev`

