CREATE DATABASE songapp;

USE songapp;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (note_id) REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE,
);

CREATE TABLE suggenstions (
    id INT AUTO_INCREMENT PRIMARY KEY
    
);

INSERT INTO users (name, email, password) VALUES ('Yahir', 'yahirftsg@gmail.com', 'password');
INSERT INTO users (name, email, password) VALUES ('Pleb', 'plebg@gmail.com', 'password');

INSERT INTO notes (title, user_id)
VALUES
("La cancion que escuche ayer llamada Helena me hizo sentir bien", 1),
("Esta cancion de the strokes esta chida", 1),
("Escucha esta cancion esta buena", 1);

--share notes from user 1 to user 2
INSERT  INTO shared_notes (note_id, user_id, shared_with_id)
VALUES(1,1,2);   --se escriben asi los valores por la manera en la que ordenamos en la linea de arriba los datos. primero escribimos note id entonces seleccionamos la nota con id 1. 

--get notes including shared notes by id
SELECT notes.*, shared_notes.shared_with_id
FROM notes
LEFT JOIN shared_notes ON notes.id = shared_notes.note_id
WHERE notes.user_id = [user_id] OR shared_notes.shared_with_id = [user_id];
