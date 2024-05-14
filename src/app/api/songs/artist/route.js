import { NextResponse } from 'next/server';
import { pool } from "../../../lib/db"; // Verifica che il percorso alla tua connessione DB sia corretto

export async function GET() {
  try {
    // Query per recuperare tutti gli utenti che sono artisti
    const queryText = 'SELECT * FROM users WHERE is_artist = TRUE'; // Modifica questa query in base al tuo schema del database
    const { rows } = await pool.query(queryText);

    // Restituisce i dati in formato JSON
    return new NextResponse(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Gestione degli errori
    console.error('Error fetching artists:', error);
    return new NextResponse(JSON.stringify({ message: 'Errore durante il recupero degli artisti', error: error.message }), {
      status: 500,
    });
  }
}
