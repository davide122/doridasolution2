import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "@/app/lib/db"; // Verifica che il percorso alla tua connessione DB sia corretto

export async function POST(req, { params }) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse(JSON.stringify({ message: 'Autenticazione richiesta' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;

        const { title, duration, file_url, category } = await req.json();
        const album_id = params.album_id; // Assumendo che l'ID dell'album venga passato come parametro nell'URL

        // Verifica se l'utente è il creatore dell'album
        const albumQuery = 'SELECT user_id FROM albums WHERE id = $1';
        const albumQueryParams = [album_id];
        const albumResult = await pool.query(albumQuery, albumQueryParams);
        if (albumResult.rowCount === 0) {
            return new NextResponse(JSON.stringify({ message: 'Album non trovato' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
        }

        const albumOwnerId = albumResult.rows[0].user_id;
        if (user_id !== albumOwnerId) {
            return new NextResponse(JSON.stringify({ message: 'Non autorizzato a modificare questo album' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
        }

        // Esegui l'inserimento della canzone nel database
        const queryText = 'INSERT INTO songs (title, duration, file_url, album_id, user_id, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING song_id, title';
        const queryParams = [title, duration, file_url, album_id, user_id, category];
        const insertResult = await pool.query(queryText, queryParams);

        return new NextResponse(JSON.stringify(insertResult.rows[0]), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error during song addition:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante l’aggiunta della canzone', error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}