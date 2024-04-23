import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "@/app/lib/db"; // Verifica che il percorso alla tua connessione DB sia corretto

export async function POST(req) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse(JSON.stringify({ message: 'Autenticazione richiesta' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.user_id;

        const { title, duration, file_url, album_id } = await req.json();

        const queryText = 'INSERT INTO songs (title, duration, file_url, album_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const queryParams = [title, duration, file_url, album_id, user_id];
        const { rows } = await pool.query(queryText, queryParams);

        return new NextResponse(JSON.stringify(rows[0]), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error adding song:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante l’aggiunta della canzone', error: error.message }), { status: 500 });
    }
}



//manca la get con id