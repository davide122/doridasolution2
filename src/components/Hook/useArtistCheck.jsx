import { useEffect, useState } from 'react';

function useArtistCheck() {
    const [artistData, setArtistData] = useState(null);

    useEffect(() => {
        async function fetchAdminStatus() {
            const token = localStorage.getItem('token'); // Recupera il token dal localStorage
            if (!token) {
                window.location.href = '/login'; // Reindirizza a login se non c'è token
                return;
            }

            const response = await fetch('/api/user/checkartist', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setArtistData(data); // Memorizza i dati del profilo dell'artista nello stato
                window.location.href = '/login'; // Reindirizza a login se la risposta non è OK
            }
        }

        fetchAdminStatus();
    }, []);
}

export default useArtistCheck;
