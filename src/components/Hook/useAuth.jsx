import { useState, useEffect } from 'react';

function useAuth() {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user_id: null,
        isLoading: true  // Aggiungi un flag di caricamento per gestire lo stato iniziale
    });

    useEffect(() => {
        fetch('/api/user/useAuth')  // Cambia l'URL se necessario
            .then(res => res.json())
            .then(data => {
                setAuthState({
                    isAuthenticated: data.isAuthenticated,
                    user_id: data.user_id,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error('Errore durante il recupero dello stato di autenticazione:', error);
                setAuthState(state => ({ ...state, isLoading: false }));
            });
    }, []);

    return authState;
}

export default useAuth;
