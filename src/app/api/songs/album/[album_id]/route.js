import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "@/app/lib/db";

export async function PUT(request,{params}) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    console.log(token);
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    let user_id;
    console.log(user_id);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user_id = decoded.user_id;
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
    }

    try {
        const  album_id  = params.album_id;
        const { title, release_date, cover_url, description } = await request.json();
console.log(title, release_date, cover_url, description, album_id, user_id);
        // Query per l'aggiornamento dell'album
        const queryText = 'UPDATE albums SET title = $1, release_date = $2, cover_url = $3, description = $4 WHERE album_id = $5 AND user_id = $6 RETURNING *';
        const queryParams = [title, release_date, cover_url, description, album_id, user_id];
        const { rows } = await pool.query(queryText, queryParams);

        if (rows.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Album non trovato o accesso negato' }), { status: 404 });
        }

        // Risposta con i dettagli dell'album aggiornato
        return new NextResponse(JSON.stringify(rows[0]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.log(error)
        console.error('Error updating album:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante l’aggiornamento dell’album', error: error.message }), { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const album_id = params.album_id;
    if (!album_id) {
        return new NextResponse(JSON.stringify({ message: 'Album ID è obbligatorio' }), { status: 400 });
    }

    // Estrai il token JWT dal header 'Authorization'
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    let user_id;
    try {
        // Verifica il token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user_id = decoded.user_id;
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
    }

    try {
        // Verifica se l'album appartiene all'utente
        const ownershipCheckQuery = 'SELECT * FROM albums WHERE album_id = $1 AND user_id = $2';
        const ownershipCheckResult = await pool.query(ownershipCheckQuery, [album_id, user_id]);
        if (ownershipCheckResult.rowCount === 0) {
            return new NextResponse(JSON.stringify({ message: 'Non autorizzato o album non trovato' }), { status: 404 });
        }

        // Elimina l'album
        const deleteQuery = 'DELETE FROM albums WHERE album_id = $1';
        await pool.query(deleteQuery, [album_id]);

        return new NextResponse(JSON.stringify({ message: 'Album eliminato con successo' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting album:', error);
        return new NextResponse(JSON.stringify({ message: "Errore durante eliminazione dell’album, error: error.message"}), { status: 500 });
    }
}



export async function GET(request, { params }) {
    const album_id = params.album_id;
    console.log(album_id);
    if (!album_id) {
        return new NextResponse(JSON.stringify({ message: 'Album ID è obbligatorio' }), { status: 400 });
    }

    try {
        // Query per ottenere tutte le canzoni, le informazioni dell'album e dettagli specifici dell'utente di un determinato album
        const queryText = `
            SELECT s.*, a.title AS album_title, a.user_id, a.release_date, a.cover_url, a.description,
                   u.username, u.artist_bio, u.profile_picture_url
            FROM songs s
            INNER JOIN albums a ON s.album_id = a.album_id
            INNER JOIN users u ON a.user_id = u.user_id
            WHERE s.album_id = $1;
        `;
        const queryParams = [album_id];
        const { rows } = await pool.query(queryText, queryParams);

        if (rows.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Nessuna canzone, informazioni sull\'album o dettagli utente trovati per questo album' }), { status: 404 });
        }

        // Restituisci le canzoni, le informazioni dell'album e i dettagli dell'utente trovati
        return new NextResponse(JSON.stringify(rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching songs, album details, and user information:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero delle canzoni, delle informazioni dell\'album e dei dettagli utente', error: error.message }), { status: 500 });
    }
}



