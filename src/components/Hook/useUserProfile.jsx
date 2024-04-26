import { useState, useEffect } from 'react';

export function useUserProfile() {
    const [data, setData] = useState({ userProfile: null, error: null });

    useEffect(() => {
        async function fetchUserProfile() {
            try {
                const token = localStorage.getItem('token'); // Recupera il token dal localStorage
                const response = await fetch('/api/user/FindProfile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const jsonData = await response.json();
                if (!response.ok) {
                    throw new Error(jsonData.error || 'Errore durante il recupero del profilo dell\'utente');
                }
                setData(jsonData); // Assicurati di settare l'oggetto userProfile
            } catch (error) {
                setData({ userProfile: null, error: error.message });
            }
        }

        fetchUserProfile();
    }, []);

    return data;
}
