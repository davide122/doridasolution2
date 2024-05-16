async function fetchAlbumDetails(album_id) {
  const response = await fetch(`https://www.doridasolution.com/api/songs/album/${album_id}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch album details");
  }
  return response.json();
}

// Funzione per generare i metadati dinamici
export async function generateMetadata({ params }) {
  const { album_id } = params;
  const albumDetails = await fetchAlbumDetails(album_id);

  // Controlla che ci siano dettagli disponibili
  if (albumDetails.length === 0) {
    throw new Error("Album not found");
  }

  const album = albumDetails[0];

  // Recupera tutti i titoli delle canzoni nell'album
  const songTitles = albumDetails.map((song) => song.title);
  const firstFewSongs = songTitles.slice(0, 3).join(", ");

  const keywords = [
    "album",
    album.album_title,
    album.username,
    "musica",
    "artisti",
    ...songTitles, 
  ];

  return {
    title: `${album.album_title} - Album di ${album.username}`,
    description: `Esplora l'album "${album.album_title}" dell'artista ${album.username}. Include le canzoni: ${firstFewSongs}...`,
    keywords,
    openGraph: {
      title: `${album.album_title} - Album di ${album.username}`,
      description: `Esplora l'album "${album.album_title}" dell'artista ${album.username}. Include le canzoni: ${firstFewSongs}...`,
      url: `https://www.doridasolution.com/album/${album_id}`,
      images: [
        {
          url: album.cover_url,
          alt: `${album.album_title} album cover`,
        },
      ],
    },
  };
}

// Componente Layout principale
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
