// app/api/user/profile.js

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { pool } from "@/app/lib/db";

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 403 });
        }

        const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [decoded.user_id]);
        const user = rows[0];

        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Utente non trovato' }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(user), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Errore durante il recupero del profilo dell\'utente:', error);
        return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero del profilo dell\'utente', error: error.message }), { status: 500 });
    }
}