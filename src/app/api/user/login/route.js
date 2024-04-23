// app/api/user/login.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from "@/app/lib/db";  // Make sure the path to your database connection pool is correct.
import jwt from 'jsonwebtoken'; // Assicurati di installare jwt con `npm install jsonwebtoken`
export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse(null, { status: 405 });
    }

    try {
        const { email, password } = await request.json();
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = rows[0];

        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Utente non trovato' }), { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) {
            return new NextResponse(JSON.stringify({ message: 'Password errata' }), { status: 401 });
        }

        // Determina la pagina di redirect basata sul ruolo dell'utente
        const redirectUrl = user.is_artist ? '/artistpage' : '/';

        // Utilizza la chiave segreta dalle variabili d'ambiente
        const token = jwt.sign({
            user_id: user.user_id,
            is_artist: user.is_artist
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Restituisci il token e l'URL di redirect
        return new NextResponse(JSON.stringify({ token, redirectUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Login error:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il login', error: error.message }), { status: 500 });
    }
}


export async function GET(request) {
    if (request.method !== 'GET') {
        return new NextResponse(null, { status: 405 });
    }

    try {
        const { email } = await request.json();

        // Controllo che il campo email sia presente
        if (!email) {
            return new NextResponse(JSON.stringify({ message: 'L\'email è obbligatoria' }), { status: 400 });
        }

        // Ricerca dell'utente nel database
        const queryText = `
            SELECT username, email, is_artist, artist_bio, profile_picture_url
            FROM users
            WHERE email = $1;
        `;
        const queryParams = [email];
        const { rows } = await pool.query(queryText, queryParams);

        // Controllo se l'utente esiste
        if (rows.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Utente non trovato' }), { status: 404 });
        }

        // Restituzione delle informazioni dell'utente
        return new NextResponse(JSON.stringify(rows[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error retrieving user information:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante la ricerca delle informazioni dell\'utente', error: error.message }), { status: 500 });
    }
}
