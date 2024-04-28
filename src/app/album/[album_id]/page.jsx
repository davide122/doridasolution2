"use client"
import React, { useEffect, useState } from 'react';
import { useRouter,useParams } from 'next/navigation';
import SongsList from '@/components/Artist/DashBoard/SongList';
import MyNavbar from '@/components/navbar/MyNavbar';
import "../../../components/DoridaMusic/Css/Maincontent.css"

const AlbumDetailsPage = () => {
  const [albumDetails, setAlbumDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { album_id } = useParams();

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
    <div>
      <img src={albumDetails[0].image_songs} alt=""  className='blurra2 '/>
      <MyNavbar/>
      <div className="container my-5 d-flex align-items-center ">
        <img src={albumDetails[0].image_songs} alt="" width={350} className='position-relative'/>
        <h1 className='text-white mx-4 position-relative'>Questa è una prova</h1>
      </div>

      <h1>{albumDetails.title}</h1>
      <SongsList songs={albumDetails}/>
    </div>
  );
};

export default AlbumDetailsPage;