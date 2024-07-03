import { API_URL } from '@/util/envExport'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePlayer = () => {
    const { playerId } = useParams()
    const navigate = useNavigate()
    const [player, setPlayer] = useState({
        Name: '',
        PlayerId: playerId,
    })

    console.log(playerId)

    useEffect(() => {
        const fetchPlayerData = async () => {
            const response = await fetch(`${API_URL}/api/player/${playerId}`)
            if (response.ok) {
                const data = await response.json()
                setPlayer({
                    Name: data.Name,
                    PlayerId: data.PlayerId,
                })
            }
        }

        fetchPlayerData()
    }, [playerId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPlayer((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch(
            `${API_URL}/api/player/${player.PlayerId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name: player.Name }),
            }
        )

        if (!response.ok) {
            toast.error('Failed to update player')
            return
        }

        toast.success('Player updated successfully')
        navigate('/players')
    }

    return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-2xl font-bold mb-4">Update Player</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block mb-2">
                    Player Name:
                    <input
                        type="text"
                        name="Name"
                        value={player.Name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-indigo-500"
                    />
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Update Player
                </button>
            </form>
        </div>
    )
}

export default UpdatePlayer
