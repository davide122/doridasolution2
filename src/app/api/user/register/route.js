// app/api/user/register.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from "../../../lib/db";  // Make sure the path to your database connection pool is correct.

export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse(null, { status: 405 });
    }

    try {
        const { username, email, password, is_artist, artist_bio, profile_picture_url, isAdmin } = await request.json();

        // Controllo che tutti i campi richiesti siano presenti
        if (!username || !email || !password) {
            return new NextResponse(JSON.stringify({ message: 'Username, email e password sono obbligatori' }), { status: 400 });
        }

        // Hashing della password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserimento dell'utente nel database
        const queryText = `
            INSERT INTO users (username, email, hashed_password, is_artist, artist_bio, profile_picture_url, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING user_id, username, email, is_artist, is_admin;
        `;
        const queryParams = [username, email, hashedPassword, is_artist || false, artist_bio, profile_picture_url, isAdmin || false];
        const { rows } = await pool.query(queryText, queryParams);

        // Restituzione della risposta
        return new NextResponse(JSON.stringify(rows[0]), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error during registration:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante la registrazione', error: error.message }), { status: 500 });
    }
}
