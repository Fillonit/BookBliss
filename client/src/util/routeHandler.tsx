import React, { useEffect, useState } from 'react'
import { Navigate, Route } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5000/api'

export function PrivateRoute({
    element,
    ...props
}: React.ComponentProps<typeof Route>) {
    const [role, setRole] = useState<string | null>(null)
    const sessionToken = localStorage.getItem('sessionToken')

    useEffect(() => {
        if (sessionToken) {
            fetch(`${API_BASE_URL}/auth/user/${sessionToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${sessionToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((data) => {
                    setRole(data.role)
                })
                .catch((error) => handleError(error))
        }
    }, [sessionToken])

    function handleError(error: unknown) {
        console.error(error)
        setRole('error')
    }

    if (!sessionToken || role === 'error') {
        return <Navigate to="/" />
    }

    if (role === null) {
        return null
    } else if (role === 'admin') {
        return React.cloneElement(element as React.ReactElement<unknown>, props)
    } else {
        return <Navigate to="/" />
    }
}

export function PublicRoute({
    element,
    ...props
}: React.ComponentProps<typeof Route>) {
    const sessionToken = localStorage.getItem('sessionToken')

    if (!sessionToken) {
        return React.cloneElement(element as React.ReactElement<unknown>, props)
    } else {
        return <Navigate to="/" />
    }
}

export default PrivateRoute
