import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

.promise();

export async function getNotesByID(id) {
    const [rows] = await pool.query(
      `
      SELECT notes.*, shared_notes.shared_with_id
      FROM notes
      LEFT JOIN shared_notes ON notes.id = shared_notes.note_id
      WHERE notes.user_id = ? OR shared_notes.shared_with_id = ?
    `,
      [id, id]
    );
    return rows;
  }

  export async function getNote(id){
    const [rows] = await pool.query(`SELECT * FROM notes WHERE id = ?`, [id]);
    return rows[0];
  }

  export async function getSharedNotesByID(id){
    const [rows] = await pool.query(
        `SELECT * FROM shared_notes WHERE note_id = ?`
        [id]
    );
    return rows[0]
  }

  export async function getUserByID(id){
    const[rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
    return rows[0];
  }

  export async function getUserByEmail(email){
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
        email,
    ]);
    return rows[0];
  }

  export async function createNote(user_id, title) {
    const [result] = await pool.query(
      `
      INSERT INTO notes (user_id, title)
      VALUES (?, ?)
    `,
      [user_id, title]
    );
    const noteID = result.insertId;
    return getNote(noteID);
  }

  export async function deleteNote(id) {
    const [result] = await pool.query(
      `
      DELETE FROM notes WHERE id = ?;
      `,
      [id]
    );
    return result;
  }

  export async function toggleCompleted(id, value) {
    const newValue = value === true ? "TRUE" : "FALSE";
    const [result] = await pool.query(
      `
      UPDATE notes
      SET completed = ${newValue} 
      WHERE id = ?;
      `,
      [id]
    );
    return result;
  }

  export async function shareNote(note_id, user_id, shared_with_id) {
    const [result] = await pool.query(
      `
      INSERT INTO shared_notes (note_id, user_id, shared_with_id) 
      VALUES (?, ?, ?);
      `,
      [note_id, user_id, shared_with_id]
    );
    return result.insertId;
  }
  /**
   * Tests for development
   */
  // console.log(await createNote("test", "test"));
  
  // const notes = await getNotes();
  // console.log(notes);
  
  // const noteByID = await getNote(2);
  // console.log(noteByID);
  
  // await deleteNote(2);
  
  // await shareNote(13, 2, 1);

