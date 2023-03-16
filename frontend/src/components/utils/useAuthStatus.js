import { useEffect, useState } from "react";

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const user = JSON.parse(localStorage.getItem('eliteuser'))

    useEffect(() => {
        if (user !== null && user.name !== '') {
            setLoggedIn(true)
        }
        setCheckingStatus(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return { loggedIn, checkingStatus }
}

export default useAuthStatus