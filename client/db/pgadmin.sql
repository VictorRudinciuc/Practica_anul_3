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



CREATE TABLE programari (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES "user".register(id) ON DELETE CASCADE,
  idnp VARCHAR(14)  NOT NULL,
  nume VARCHAR(100) NOT NULL,
  prenume VARCHAR(100) NOT NULL,
  data_nasterii DATE  NOT NULL,
  telefon VARCHAR(20) NOT NULL,
  serviciu VARCHAR(100) NOT NULL,
  locatie VARCHAR(100) NOT NULL,
  data_programare DATE NOT NULL,
  ora TIME         NOT NULL
);


ALTER TABLE "user".register
  ADD COLUMN is_admin BOOLEAN NOT NULL DEFAULT FALSE;
INSERT INTO "user".register (nume, prenume, email, parola, is_admin)
VALUES (
  'Super', 'Admin', 'admin@ex.com',
  crypt('lolXDlol09!', gen_salt('bf')),
  TRUE
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;
SELECT * FROM "user".register
SELECT * FROM "user".login
INSERT INTO "user".login (id, email, parola)
SELECT id, email, parola
FROM "user".register
WHERE email = 'admin@gmail.com';