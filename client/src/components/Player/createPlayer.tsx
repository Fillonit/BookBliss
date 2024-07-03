import { API_URL } from '@/util/envExport'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const CreatePlayer = () => {
    const [player, setPlayer] = useState({
        Name: '',
        Number: 0,
        TeamId: '',
        BirthYear: 0,
    })

    const [teams, setTeams] = useState<{ TeamId: string; Name: string }[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch(`${API_URL}/api/teams`)
            .then((res) => res.json())
            .then((data) => {
                setTeams(data)
                setLoading(false)
            })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPlayer((prevState) => ({
            ...prevState,
            [name]:
                name === 'Number' || name === 'BirthYear'
                    ? parseInt(value, 10)
                    : value,
        }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setPlayer((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch(`${API_URL}/api/player`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        })

        if (!response.ok) {
            toast.error('Failed to create player')
            return
        }

        toast.success('Player created successfully')
    }

    return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-2xl font-bold mb-4">Create Player</h1>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block mb-2">
                    Name:
                    <input
                        type="text"
                        name="Name"
                        value={player.Name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-indigo-500"
                    />
                </label>
                <label className="block mb-2">
                    Number:
                    <input
                        type="number"
                        name="Number"
                        value={player.Number}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-indigo-500"
                    />
                </label>
                <label className="block mb-4">
                    Team:
                    <select
                        name="TeamId"
                        value={player.TeamId}
                        onChange={handleSelectChange}
                        className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-indigo-500"
                    >
                        <option value="">Select team</option>
                        {teams.map((team) => (
                            <option key={team.TeamId} value={team.TeamId}>
                                {team.Name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="block mb-2">
                    Birth Year:
                    <input
                        type="number"
                        name="BirthYear"
                        value={player.BirthYear}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-indigo-500"
                    />
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Create Player
                </button>
            </form>
        </div>
    )
}

export default CreatePlayer
