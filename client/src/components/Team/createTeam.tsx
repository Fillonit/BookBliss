import { API_URL } from '@/util/envExport'
import { useState } from 'react'
import { toast } from 'react-toastify'

const CreateTeam = () => {
    const [team, setTeam] = useState({
        Name: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTeam((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const response = await fetch(`${API_URL}/api/team`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: team.Name }),
        })

        if (!response.ok) {
            toast.error('Failed to create team')
            return
        }

        toast.success('Team created successfully')
    }

    return (
        <div className="flex flex-col items-center mt-24">
            <h1 className="text-2xl font-bold mb-4">Create Team</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <label className="block mb-2">
                    Team Name:
                    <input
                        type="text"
                        name="Name"
                        value={team.Name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 text-indigo-500"
                    />
                </label>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                    Create Team
                </button>
            </form>
        </div>
    )
}

export default CreateTeam
