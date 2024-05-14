// pages/api/recommendations.js
import { pool } from '../../lib/db';

export async function GET(req, res) {
  try {
    const userId = parseInt(req.query.userId);

    // Recupera la matrice di interazione utente-canzone
    const { rows: interactions } = await pool.query(`
      SELECT user_id, song_id, play_count
      FROM user_song_plays
    `);

    // Costruisci la matrice utente-canzone
    const interactionMatrix = {};
    interactions.forEach(({ user_id, song_id, play_count }) => {
      if (!interactionMatrix[user_id]) {
        interactionMatrix[user_id] = {};
      }
      interactionMatrix[user_id][song_id] = play_count;
    });

    // Calcola la somiglianza con ogni altro utente
    const similarityScores = {};
    Object.keys(interactionMatrix).forEach(otherUserId => {
      if (otherUserId !== userId.toString()) {
        const score = cosineSimilarity(interactionMatrix[userId], interactionMatrix[otherUserId]);
        similarityScores[otherUserId] = score;
      }
    });

    // Trova gli utenti più simili
    const sortedSimilarUsers = Object.keys(similarityScores).sort((a, b) => similarityScores[b] - similarityScores[a]);
    const topUser = sortedSimilarUsers[0];

    // Raccomanda canzoni dagli utenti simili
    const recommendations = [];
    Object.keys(interactionMatrix[topUser]).forEach(songId => {
      if (!(songId in interactionMatrix[userId])) {
        recommendations.push(songId);
      }
    });

    // Restituisci le canzoni raccomandate
    const { rows: recommendedSongs } = await pool.query(`
      SELECT * FROM songs WHERE song_id = ANY($1::int[])
    `, [recommendations]);

    res.status(200).json(recommendedSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Funzione helper per calcolare la somiglianza coseno
function cosineSimilarity(vec1, vec2) {
  const vec1Values = Object.values(vec1);
  const vec2Values = Object.values(vec2);
  const dotProduct = vec1Values.reduce((acc, v, i) => acc + v * vec2Values[i], 0);
  const magnitude1 = Math.sqrt(vec1Values.reduce((acc, v) => acc + v * v, 0));
  const magnitude2 = Math.sqrt(vec2Values.reduce((acc, v) => acc + v * v, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Default handler che reindirizza le richieste al metodo appropriato
export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return GET(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
