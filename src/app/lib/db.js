// lib/db.js

import { Pool } from 'pg';

// Configura la connessione al database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Creazione della tabella `users`
async function createUsersTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT false
      );
    `);
    console.log('Table "users" created successfully');
  } catch (error) {
    console.error('Error creating table "users":', error);
  } finally {
    client.release();
  }
}

// Popolamento della tabella `users` con dati di esempio
async function populateUsersTable() {
  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO users (username, password, is_admin) VALUES
      ('admin', 'hashed_admin_password_here', true),
      ('user', 'hashed_user_password_here', false);
    `);
    console.log('Users table populated successfully');
  } catch (error) {
    console.error('Error populating users table:', error);
  } finally {
    client.release();
  }
}

// Esegui la creazione della tabella e il popolamento dei dati
createUsersTable();
populateUsersTable();

export { pool };
