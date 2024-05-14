import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    let response = {
        isAuthenticated: false,
        message: 'Utente non autenticato',
        user_id: null  // Inizializza userId come null
    };

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            response = {
                isAuthenticated: true,
                message: 'Utente autenticato',
                user_id: decoded. user_id  // Include userId nel payload del token
            };
        } catch (error) {
            response = {
                isAuthenticated: false,
                message: 'Token non valido',
                user_id: null  // Mantieni userId come null se il token non è valido
            };
        }
    }

    return new NextResponse(JSON.stringify(response), { status: 200 });
}
