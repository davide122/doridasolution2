import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "../../../lib/db";

export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse(null, { status: 405 });
    }

    try {
        // Estrai il token JWT dal header Authorization
        const token = request.headers.get('Authorization')?.split(' ')[1]; // Bearer Token
        if (!token) {
            return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
        }

        // Verifica il token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;

        const { title, release_date, cover_url, description } = await request.json();

        // Inserimento dell'album nel database
        const queryText = 'INSERT INTO albums (user_id, title, release_date, cover_url, description) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const queryParams = [user_id, title, release_date, cover_url, description];
        const { rows } = await pool.query(queryText, queryParams);

        return new NextResponse(JSON.stringify(rows[0]), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error during album creation or token verification:', error);
        if (error.name === 'JsonWebTokenError') {
            return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
        }
        return new NextResponse(JSON.stringify({ message: 'Errore durante la creazione dell’album', error: error.message }), { status: 500 });
    }
}

export async function GET(request) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse(JSON.stringify({ message: 'Autenticazione richiesta' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
        // Verifica il token JWT per ottenere l'ID dell'utente
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;

        // Query al database per ottenere gli album dell'artista
        const queryText = 'SELECT * FROM albums WHERE user_id = $1';
        const queryParams = [user_id];
        const { rows } = await pool.query(queryText, queryParams);

        return new NextResponse(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error fetching albums:', error);
        if (error.name === 'JsonWebTokenError') {
            return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
        }
        return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero degli album', error: error.message }), { status: 500 });
    }
}

