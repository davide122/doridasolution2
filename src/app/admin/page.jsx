"use client"
import { useState } from 'react';
import useAdminCheck from '../../components/Hook/useAdminCheck';
import Contact from '../../components/Contactspage/Contact';
import AlbumManager from '../../components/album/AlbumManager';
import AlbumSelector from '../../components/album/AlbumSelector';
import 'bootstrap/dist/css/bootstrap.min.css';


function AdminPage() {
    useAdminCheck();
    const [activeTab, setActiveTab] = useState('contacts');

    return (
        <div className="dashboard-container">
            <nav className="sidebar pt-5">
                <a href="#" onClick={() => setActiveTab('contacts')} className={`nav-link ${activeTab === 'contacts' ? 'active' : ''}`}>Contatti</a>
                <a href="#" onClick={() => setActiveTab('addAlbum')} className={`nav-link ${activeTab === 'addAlbum' ? 'active' : ''}`}>Aggiungi Album</a>
                <a href="#" onClick={() => setActiveTab('addSong')} className={`nav-link ${activeTab === 'addSong' ? 'active' : ''}`}>Aggiungi Canzone</a>
            </nav>
            <div className="main-content">
                <div className="bg-custom-white">
                    <h1>Pannello di Controllo Admin</h1>
                    <div className="btn-custom-group">
                        <button onClick={() => setActiveTab('contacts')} className="btn btn-primary">Contatti</button>
                        <button onClick={() => setActiveTab('addAlbum')} className="btn btn-secondary">Aggiungi Album</button>
                        <button onClick={() => setActiveTab('addSong')} className="btn btn-secondary">Aggiungi Canzone</button>
                    </div>
                    {activeTab === 'contacts' && <Contact />}
                    {activeTab === 'addAlbum' && <AlbumManager />}
                    {activeTab === 'addSong' && <AlbumSelector />}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
