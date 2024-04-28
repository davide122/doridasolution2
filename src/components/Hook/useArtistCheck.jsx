import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function useArtistCheck() {
    const [artistData, setArtistData] = useState(null);
    const route = useRouter();

    useEffect(() => {
        async function fetchAdminStatus() {
            const token = localStorage.getItem('token');
            if (!token) {
                route.push("/login");
                return;
            }
    
            const response = await fetch('/api/user/checkartist', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    // Se il token non è valido o non autorizzato
                    localStorage.removeItem('token');  // Rimuovi il token problematico
                    route.push("/login");  // Reindirizza l'utente alla pagina di login
                } else {
                    // Gestisci altri tipi di errori HTTP
                    console.error('Errore di rete o server non disponibile.');
                }
            } else {
                const data = await response.json();
                setArtistData(data);  // Memorizza i dati del profilo dell'artista nello stato
            }
        }
    
        fetchAdminStatus();
    }, []);
}

export default useArtistCheck;
