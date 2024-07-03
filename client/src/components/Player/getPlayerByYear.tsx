import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_URL } from '@/util/envExport'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

interface Player {
    PlayerId: string
    Name: string
    BirthYear: number
}

const PlayersList = () => {
    const navigate = useNavigate()
    const { year } = useParams()
    const [inputYear, setInputYear] = useState(year || '')
    const [years, setYears] = useState<string[]>([])
    const [players, setPlayers] = useState<Player[]>([])
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

    useEffect(() => {
        fetchYears()
        if (year) {
            fetchPlayers(year)
        }
    }, [year])

    const fetchYears = async () => {
        try {
            const response = await fetch(`${API_URL}/api/players`)
            if (!response.ok) throw new Error('Failed to fetch players')
            const playersData: Player[] = await response.json()
            const extractedYears = playersData.map((player) =>
                player.BirthYear.toString()
            )
            const uniqueYears = [...new Set(extractedYears)].sort()
            setYears(uniqueYears)
        } catch (error) {
            toast.error('Failed to load years')
        }
    }

    const fetchPlayers = async (year: string) => {
        try {
            const response = await fetch(`${API_URL}/api/players/year/${year}`)
            if (!response.ok) throw new Error('Failed to fetch players')
            const data = await response.json()
            setPlayers(data)
        } catch (error) {
            toast.error('Failed to load players')
        }
    }

    const handleYearSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (inputYear.trim() !== '') {
            navigate(`/players/year/${inputYear}`)
        } else {
            toast.error('Year is required')
        }
    }

    // const handleFocus = () => {
    //     setInputYear('')
    // }

    const handleDelete = async () => {
        if (selectedPlayer) {
            const response = await fetch(
                `${API_URL}/api/player/${selectedPlayer.PlayerId}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                toast.error('Failed to delete player')
            } else {
                toast.success('Player deleted successfully')
                setPlayers(
                    players.filter(
                        (player) => player.PlayerId !== selectedPlayer.PlayerId
                    )
                )
            }
            setDeleteDialogOpen(false)
        }
    }
    return (
        <div className="flex flex-col items-center mt-24 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Players List</h1>
            <form
                onSubmit={handleYearSubmit}
                className="mb-4"
                // onFocus={handleFocus}
            >
                <select
                    value={inputYear}
                    onChange={(e) => setInputYear(e.target.value)}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-indigo-500"
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <Button type="submit">Load Players</Button>
            </form>
            <Link
                to="/player/create"
                className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Add Player
            </Link>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Delete</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {players.map((player) => (
                        <tr key={player.PlayerId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {player.Name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                    to={`/player/${player.PlayerId}/update`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    <HiOutlinePencil />
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => {
                                        setSelectedPlayer(player)
                                        setDeleteDialogOpen(true)
                                    }}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <HiOutlineTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Player</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this player?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                onClick={() => setDeleteDialogOpen(false)}
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            onClick={handleDelete}
                            className="text-white font-bold bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PlayersList
