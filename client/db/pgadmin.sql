CREATE DATABASE servicii_publice;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);


DROP TABLE public.users;


CREATE SCHEMA "user";


CREATE TABLE "user".register (
  id       SERIAL        PRIMARY KEY,
  nume     VARCHAR(100)  NOT NULL,
  prenume  VARCHAR(100)  NOT NULL,
  email    VARCHAR(255)  UNIQUE NOT NULL,
  parola   TEXT          NOT NULL
);


CREATE TABLE "user".login (
  id       INT           PRIMARY KEY
    REFERENCES "user".register(id)
    ON DELETE CASCADE,
  email    VARCHAR(255)  UNIQUE NOT NULL,
  parola   TEXT          NOT NULL
);
