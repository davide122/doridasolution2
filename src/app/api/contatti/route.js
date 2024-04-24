import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "@/app/lib/db"; // Verifica che il percorso alla tua connessione DB sia corretto
import validator from 'validator';

  
export async function POST(request) {
    if (request.method !== 'POST') {
        return new NextResponse(null, { status: 405 });
    }
    try {
        const { nome, email, persona, messaggio } = await request.json();
        if (!nome || !email || !persona || !messaggio) {
            return new NextResponse(JSON.stringify({ message: 'Tutti i campi sono obbligatori' }), { status: 400 });
        }

        // Validazione dell'email
        if (!validator.isEmail(email)) {
            return new NextResponse(JSON.stringify({ message: 'Indirizzo email non valido' }), { status: 400 });
        }

        const queryText = 'INSERT INTO contatti (nome, email, persona, messaggio) VALUES ($1, $2, $3, $4) RETURNING *';
        const queryParams = [nome, email, persona, messaggio];
        const { rows } = await pool.query(queryText, queryParams);

       

          return new NextResponse(JSON.stringify({ message: 'Contatto aggiunto con successo e email di conferma inviata!' }), { status: 201 });
        } catch (error) {
        console.error('Error during database operation:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante l’inserimento nel database', error: error.message }), { status: 500 });
    }
}












export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return new NextResponse(JSON.stringify({ message: 'Accesso non autorizzato' }), { status: 403 });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
    }

    try {
        const { persona, email, data } = request.nextUrl.searchParams;
        let queryParams = [];
        let queryText = 'SELECT * FROM contatti';
        let conditions = [];

        if (persona) {
            conditions.push('persona = $1');
            queryParams.push(persona);
        }
        if (email) {
            conditions.push('email = $2');
            queryParams.push(email);
        }
        if (data) {
            conditions.push('data = $3');
            queryParams.push(data);
        }

        if (conditions.length) {
            queryText += ' WHERE ' + conditions.join(' AND ');
        }

        const { rows } = await pool.query(queryText, queryParams);
        return new NextResponse(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error retrieving contact requests:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero delle richieste di contatto', error: error.message }), { status: 500 });
    }
}
