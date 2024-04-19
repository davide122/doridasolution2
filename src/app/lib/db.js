// import pg from 'pg';

// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL ,
// })
// // Creazione della tabella `users`
// async function createUsersTable() {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(100) NOT NULL,
//         is_admin BOOLEAN NOT NULL DEFAULT false
//       );
//     `);
//     console.log('Table "users" created successfully');
//   } catch (error) {
//     console.error('Error creating table "users":', error);
//   } finally {
//     client.release();
//   }
// }

// // Popolamento della tabella `users` con dati di esempio
// async function populateUsersTable() {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//       INSERT INTO users (username, password, is_admin) VALUES
//       ('admin', 'hashed_admin_password_here', true),
//       ('user', 'hashed_user_password_here', false);
//     `);
//     console.log('Users table populated successfully');
//   } catch (error) {
//     console.error('Error populating users table:', error);
//   } finally {
//     client.release();
//   }
// }


// async function CreateTableForm() {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//     CREATE TABLE IF NOT EXISTS createtableform (
//       id SERIAL PRIMARY KEY,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       phone VARCHAR(20),
//       info TEXT
//   );
//     `);
//     console.log('Table createtableform created successfully');
//   } catch (error) {
//     console.error('Error creating table createtableform:', error.stack);
//   } finally {
//     client.release();
//   }
// }


// // Esegui la creazione della tabella e il popolamento dei dati
// console.log("Creating table...");
// CreateTableForm();
// // createUsersTable();
// // populateUsersTable();

// export { pool };

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false  // Imposta su `true` per ambienti di produzione sicuri
  }
});

export { pool };