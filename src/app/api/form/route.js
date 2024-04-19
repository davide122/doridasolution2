// Assuming this file is located at app/api/form.js
import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";  // Make sure the path to your database connection pool is correct.

export async function POST(request) {
    if (request.method !== 'POST') {
        // Respond with a 405 Method Not Allowed if not a POST request
        return new NextResponse(null, { status: 405 });
    }

    try {
        const { email, phone, info } = await request.json();  // Parse JSON from the request body
        if (!email || !phone || !info) {
            // Return a 400 Bad Request if any fields are missing
            return new NextResponse(JSON.stringify({ message: 'Email, telefono e info sono obbligatori' }), { status: 400 });
        }

        // Insert data into the database
        const queryText = 'INSERT INTO prova (email, phone, info) VALUES ($1, $2, $3) RETURNING *';
        const queryParams = [email, phone, info];
        const { rows } = await pool.query(queryText, queryParams);

        // Return the newly created record
        return new NextResponse(JSON.stringify(rows[0]), { status: 201 });

    } catch (error) {
        // Log and return a 500 Internal Server Error if something goes wrong
        console.error('Error during database operation:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante l’inserimento nel database', error: error.message }), { status: 500 });
    }
}


export async function GET(request) {
    if (request.method !== 'GET') {
        // Rispondi con 405 Method Not Allowed se non è una richiesta GET
        return new NextResponse(null, { status: 405 });
    }

    try {
        // Query per ottenere tutti i record dalla tabella prova
        const queryText = 'SELECT * FROM prova;';
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
