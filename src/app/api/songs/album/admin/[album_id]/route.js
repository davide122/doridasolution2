import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "../../../../../lib/db";

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
        // Verifica se l'utente è admin
        const adminCheckQuery = 'SELECT is_admin FROM users WHERE user_id = $1';
        const adminCheckResult = await pool.query(adminCheckQuery, [user_id]);
        if (adminCheckResult.rows.length === 0 || !adminCheckResult.rows[0].is_admin) {
            return new NextResponse(JSON.stringify({ message: 'Accesso non autorizzato' }), { status: 403 });
        }

        // Elimina l'album senza ulteriori controlli di proprietà
        const deleteQuery = 'DELETE FROM albums WHERE album_id = $1 RETURNING *';
        const deleteResult = await pool.query(deleteQuery, [album_id]);
        if (deleteResult.rowCount === 0) {
            return new NextResponse(JSON.stringify({ message: 'Album non trovato' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify({ message: 'Album eliminato con successo', album: deleteResult.rows[0] }), { status: 200 });
    } catch (error) {
        console.error('Error deleting album:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante eliminazione dell’album', error: error.message }), { status: 500 });
    }
}


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

        // Verifica se l'utente è admin
        const adminCheckQuery = 'SELECT is_admin FROM users WHERE user_id = $1';
        const adminCheckResult = await pool.query(adminCheckQuery, [user_id]);
        if (adminCheckResult.rowCount === 0 || !adminCheckResult.rows[0].is_admin) {
            return new NextResponse(JSON.stringify({ message: 'Accesso non autorizzato' }), { status: 403 });
        }

        const { title, release_date, cover_url, description } = await request.json();

        // Inserimento dell'album nel database come admin
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
