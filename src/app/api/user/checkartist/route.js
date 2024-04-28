import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token non fornito' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.is_artist) {
            // Check if the user has the is_artist flag instead of isAdmin
            return new NextResponse(JSON.stringify({ message: 'Accesso non autorizzato' }), { status: 403 });
        }
        // Se l'utente è un artista, restituisci una risposta positiva

        return new NextResponse(JSON.stringify({ message: 'Accesso autorizzato' }), { status: 200 });
    } catch (error) {
        // Se il token non è valido o scaduto
        return new NextResponse(JSON.stringify({ message: 'Token non valido' }), { status: 401 });
    }
}