CREATE TABLE movie (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  release INTEGER NOT NULL,
  synopsis TEXT,
  duration_minutes INTEGER,
  age_rating VARCHAR(10),
  language VARCHAR(50)
);

CREATE TABLE reviewer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  password VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(180) NOT NULL UNIQUE
);

create table director (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL
);

CREATE TABLE movie_director (
  director_id INT not null,
  movie_id INT NOT NULL,
  PRIMARY KEY (director_id, movie_id),
	foreign key (director_id) references director(id),
  foreign key (movie_id) references movie(id)
);

CREATE TABLE actor (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL
);

CREATE TABLE movie_actor (
  actor_id INT not null,
  movie_id INT NOT NULL,
  PRIMARY KEY (actor_id, movie_id),
	foreign key (movie_id) references movie(id),
  foreign key (actor_id) references actor(id)
);

CREATE TABLE genre (
  id SERIAL PRIMARY KEY,
  name VARCHAR(180) NOT NULL
);

CREATE TABLE movie_genre (
  genre_id INT not null,
  movie_id INT NOT NULL,
  PRIMARY KEY (genre_id, movie_id),
	foreign key (movie_id) references movie(id),
  foreign key (genre_id) references genre(id)
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  reviewer_id INT NOT NULL,
  movie_id INT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 0 AND 10),
  review TEXT,
  heart BOOLEAN,
  FOREIGN KEY (reviewer_id) REFERENCES reviewer(id),
  FOREIGN KEY (movie_id) REFERENCES movie(id)
);


-- git config --local user.name "xxxxxxx"
-- git config --local user.email "xxxx.gmail.com"
-- comentário testão