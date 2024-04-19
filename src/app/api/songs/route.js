// Assuming this file is located at app/api/songs.js
import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db"; // Verifica che il percorso alla tua connessione DB sia corretto

export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse(null, { status: 405 });
    }

    try {
        const { song_name, artist_name, mp3_file, blurred_image, original_image } = await request.json();
        if (!song_name || !artist_name || !mp3_file || !blurred_image || !original_image) {
            return new NextResponse(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
        }

        const queryText = 'INSERT INTO songs (song_name, artist_name, mp3_file, blurred_image, original_image) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const queryParams = [song_name, artist_name, mp3_file, blurred_image, original_image];
        const { rows } = await pool.query(queryText, queryParams);

        return new NextResponse(JSON.stringify(rows[0]), { status: 201 });
    } catch (error) {
        console.error('Error during database operation:', error);
        return new NextResponse(JSON.stringify({ message: 'Error inserting the song', error: error.message }), { status: 500 });
    }
}

export async function GET(request) {
    if (request.method !== 'GET') {
        // Rispondi con 405 Method Not Allowed se non è una richiesta GET
        return new NextResponse(null, { status: 405 });
    }

    try {
        // Query per ottenere tutti i record dalla tabella prova
        const queryText = 'SELECT * FROM songs;';
        const { rows } = await pool.query(queryText);

        // Se non ci sono dati, ritorna un 404 Not Found
        if (rows.length === 0) {
            return new NextResponse(JSON.stringify({ message: 'Nessun dato trovato' }), { status: 404 });
        }

        // Altrimenti, ritorna i dati recuperati
        return new NextResponse(JSON.stringify(rows), { status: 200 });
    } catch (error) {
        // Logga e ritorna un errore 500 Internal Server Error se qualcosa va storto
        console.error('Errore durante l’operazione di recupero dati:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero dei dati', error: error.message }), { status: 500 });
    }
}
