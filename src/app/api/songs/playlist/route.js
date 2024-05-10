import { NextResponse } from 'next/server';
import { pool } from '../../../lib/db'; // Assicurati che il percorso sia corretto

export async function POST(req) {
  try {
    // Recupera tutte le categorie distinte delle canzoni
    const categoriesResult = await pool.query('SELECT DISTINCT category FROM songs WHERE category IS NOT NULL');
    const categories = categoriesResult.rows.map(row => row.category);

    // Crea una playlist per ogni categoria
    const playlists = {};

    for (const category of categories) {
      const songsResult = await pool.query(`
        SELECT s.song_id, s.title, s.duration, s.file_url, a.title AS album_title, a.cover_url
        FROM songs s
        JOIN albums a ON s.album_id = a.album_id
        WHERE s.category = $1
        ORDER BY a.release_date DESC
      `, [category]);

      // Aggiungi la playlist al risultato finale
      playlists[category] = songsResult.rows;
    }

    // Rispondi con tutte le playlist organizzate per categoria
    return NextResponse.json(playlists);
  } catch (error) {
    console.error('Errore nella creazione delle playlist:', error);
    return NextResponse.json({ message: 'Errore durante la creazione delle playlist.' }, { status: 500 });
  }
}
