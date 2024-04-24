"use client"
import { useEffect, useState } from 'react';
import useAdminCheck from '../../components/Hook/useAdminCheck'; // Adjust the path as per your project structure
import Router from 'next/router';
import Contact from '@/components/Contactspage/contact';
import AlbumManager from '@/components/album/AlbumManager';
import AddSongForm from '@/components/album/AddSongForm';
import Albumselector from '@/components/album/AlbumSelector';

function AdminPage() {
    useAdminCheck();  // Performs the admin access check
    const [activeTab, setActiveTab] = useState('contacts');
    return (
<div className="container-fluid mt-4">
    <div className='bg-white'>
            <h1>Pannello di Controllo Admin</h1>
            <div className="btn-group">
                <button onClick={() => setActiveTab('contacts')} className="btn btn-primary ">Contatti</button>
                <button onClick={() => setActiveTab('addAlbum')} className="btn btn-secondary">Aggiungi Album</button>
                <button onClick={() => setActiveTab('addSong')} className="btn btn-secondary">Aggiungi Canzone</button>
            </div>

    </div>

            {activeTab === 'contacts' && <Contact />}
            {activeTab === 'addAlbum' && <AlbumManager/>}
            {activeTab === 'addSong' && <Albumselector/>}
        </div>    );
}

export default AdminPage;
