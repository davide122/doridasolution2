// app/api/user/login.js

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { pool } from "../../../lib/db";  // Make sure the path to your database connection pool is correct.
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
        const token = jwt.sign({
            user_id: user.user_id,
            is_artist: user.is_artist,
            isAdmin: user.is_admin 
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        let redirectUrl;
        if (user.is_admin) {
            redirectUrl = '/admin'; 
        } else if (user.is_artist) {
            redirectUrl = '/artistpage';
        } else {
            redirectUrl = '/';
        }

        // Restituisci il token e l'URL di redirect
        return new NextResponse(JSON.stringify({ token, redirectUrl }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Login error:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il login', error: error.message }), { status: 500 });
    }
}


export async function GET(request) {
    // Estrazione del token JWT dal header 'Authorization'
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Verifica che l'utente sia amministratore
        if (!decoded.isAdmin) {
            return new NextResponse(JSON.stringify({ message: 'Accesso non autorizzato' }), { status: 403 });
        }
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
    }

    try {
        const { persona } = request.nextUrl.searchParams;
        const queryParams = [];
        let queryText = 'SELECT * FROM contatti';
        if (persona) {
            queryText += ' WHERE persona = $1';
            queryParams.push(persona);
        }

        const { rows } = await pool.query(queryText, queryParams);
        return new NextResponse(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error retrieving contact requests:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero delle richieste di contatto', error: error.message }), { status: 500 });
    }
}