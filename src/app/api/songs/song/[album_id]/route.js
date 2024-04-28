import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "@/app/lib/db";

export async function POST(request, { params }) {
    // Estrai il token JWT e verifica l'autenticazione
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    let user_id;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user_id = decoded.user_id;
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
    }

    const album_id = params.album_id;
    const { title, duration, file_url, category,image_songs } = await request.json();

    if (!title || !duration || !file_url || !category || !image_songs) {
        return new NextResponse(JSON.stringify({ message: 'Tutti i campi sono obbligatori' }), { status: 400 });
    }

    try {
        // Verifica che l'utente sia il proprietario dell'album
        const ownershipCheckQuery = 'SELECT user_id FROM albums WHERE album_id = $1';
        const ownershipCheckResult = await pool.query(ownershipCheckQuery, [album_id]);
        if (ownershipCheckResult.rowCount === 0 || ownershipCheckResult.rows[0].user_id !== user_id) {
            return new NextResponse(JSON.stringify({ message: 'Non autorizzato o album non trovato' }), { status: 404 });
        }

        // Inserisci la nuova canzone nel database
        const insertQuery = 'INSERT INTO songs (album_id, user_id, title, duration, file_url, category, image_songs) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const queryParams = [album_id, user_id, title, duration, file_url, category,image_songs];
        const { rows } = await pool.query(insertQuery, queryParams);

        // Restituisci la canzone appena creata
        return new NextResponse(JSON.stringify(rows[0]), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error adding song:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante l’aggiunta della canzone', error: error.message }), { status: 500 });
    }
}
