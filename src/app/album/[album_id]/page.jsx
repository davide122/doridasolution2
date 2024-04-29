"use client"
import React, { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';
import SongsList from '../../../components/Artist/DashBoard/SongList';
import MyNavbar from '../../../components/navbar/MyNavbar';
import "../../../components/DoridaMusic/Css/Maincontent.css"
import Image from 'next/image';

const AlbumDetailsPage = () => {
  

  const [albumDetails, setAlbumDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { album_id } = useParams();
const total = albumDetails&& albumDetails.length;
const totalDuration = albumDetails&& albumDetails.reduce((acc, track) => acc + track.duration, 0);

const totalHours = Math.floor(totalDuration / 3600);
const totalMinutes = Math.floor((totalDuration % 3600) / 60);
const totalSeconds = totalDuration % 60;
console.log(`Durata totale dell'album: ${totalHours} ore, ${totalMinutes} minuti e ${totalSeconds} secondi`);

  useEffect(() => {
    // Assicurati che il router sia pronto e che il album_id sia definito
   {

      const fetchAlbumDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/api/songs/album/${album_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch album details');
          }
          const data = await response.json();
          setAlbumDetails(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAlbumDetails();
    }
  }, [router.isReady, router.query]);


  if (loading) return <div>Caricamento in corso...</div>;
  if (error) return <div>Errore: {error}</div>;
  if (!albumDetails) return <div>Nessun dettaglio disponibile.</div>;

  return (
    <div className='w-100'>
       <Image
                src={albumDetails[0].cover_url}
                alt={`Copertina dell'album ${albumDetails[0].album_title}`} // Aggiungi il nome dell'album se disponibile
                width={500} // Imposta la larghezza desiderata
                height={500} // Imposta l'altezza desiderata
                className="blurra2" // Se hai bisogno di classi personalizzate per ulteriori stili
            />
      <MyNavbar/>
      <div className="container my-5 d-flex align-items-center d-flex flex-column flex-md-row">
        <Image
                src={albumDetails[0].cover_url}  // Usa l'URL dell'immagine dell'album
                alt={`Copertina dell'album di ${albumDetails[0].username}`} // Descrivi l'immagine, ad esempio "Copertina dell'album di [Artista]"
                width={300}  // Larghezza dell'immagine
                height={300}  // Altezza dell'immagine
                className='rounded-5 position-relative img-fluid '  // Applica classi per stili come l'arrotondamento
            />
        <div className='mt-3'>
        <h1 className='text-white mx-4 position-relative text-center text-md-start Title fs-1'>{albumDetails[0].username}</h1>
        <p className='text-white mx-4 position-relative  fs-6 fs-md-5 my-2  text-center text-md-start'>{albumDetails[0].description}</p>
        <p className='fs-6 mx-4  text-center text-md-start'>{total} brani  {totalHours}:{totalMinutes}:{totalSeconds} </p>
        </div>
      </div>

      <h1>{albumDetails.title}</h1>
      <SongsList songs={albumDetails}/>
    </div>
    
  );
};

export default AlbumDetailsPage ;