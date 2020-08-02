CREATE DATABASE dronecontrols;

USE dronecontrols;

-- USERS
CREATE TABLE users(
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(120) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

-- EVENTS
CREATE TABLE events(
  id INT(11) NOT NULL,
  name_event VARCHAR(120) NOT NULL,
  create_at timestamp NOT NULL DEFAULT current_timestamp,
  dateStart DATE;
  place_details TEXT,
  user_id INT(11),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE events
  ADD PRIMARY KEY (id);

ALTER TABLE events
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE events;