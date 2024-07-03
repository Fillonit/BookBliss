import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

interface Team {
    TeamId: string
    Name: string
}

const TeamsList = () => {
    const [teams, setTeams] = useState<Team[]>([])
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`${API_URL}/api/teams`)
                if (!response.ok) throw new Error('Failed to fetch teams')
                const data = await response.json()
                setTeams(data)
            } catch (error) {
                toast.error('Failed to load teams')
            }
        }

        fetchTeams()
    }, [])

    const handleDelete = async () => {
        if (selectedTeam) {
            const response = await fetch(
                `${API_URL}/api/team/${selectedTeam.TeamId}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) {
                toast.error('Failed to delete team')
            } else {
                toast.success('Team deleted successfully')
                setTeams(
                    teams.filter((team) => team.TeamId !== selectedTeam.TeamId)
                )
            }
            setDeleteDialogOpen(false)
        }
    }

    return (
        <div className="flex flex-col items-center mt-24 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Teams List</h1>
            <Link
                to="/team/create"
                className="mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Add Team
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
                    {teams.map((team) => (
                        <tr key={team.TeamId}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {team.Name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link
                                    to={`/team/${team.TeamId}/update`}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    <HiOutlinePencil />
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => {
                                        setSelectedTeam(team)
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
                        <DialogTitle>Delete Team</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this team?
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

export default TeamsList
