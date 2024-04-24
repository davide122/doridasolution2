import { useEffect } from 'react';

function useAdminCheck() {
    useEffect(() => {
        async function fetchAdminStatus() {
            const token = localStorage.getItem('token'); // Recupera il token dal localStorage
            if (!token) {
                window.location.href = '/login'; // Reindirizza a login se non c'è token
                return;
            }

            const response = await fetch('/api/user/checkadmin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                window.location.href = '/login'; // Reindirizza a login se la risposta non è OK
            }
        }

        fetchAdminStatus();
    }, []);
}

export default useAdminCheck;
