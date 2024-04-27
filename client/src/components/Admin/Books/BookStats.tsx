import {
    CardHeader,
    CardTitle,
    CardContent,
    // CardDescription,
    Card,
} from '@/components/ui/card'

import {
    HiOutlineUserGroup,
    HiOutlinePencilAlt,
    HiOutlineCursorClick,
    HiOutlineShieldCheck,
} from 'react-icons/hi'

import { API_URL } from '@/util/envExport'
import { useEffect, useState } from 'react'
import { User } from '@/types/UserType'
export default function BookStats() {
    const [userCount, setUserCount] = useState(0)
    const [users, setUsers] = useState<User[]>([])
    const [authors, setAuthors] = useState<User[]>([])
    const [admins, setAdmins] = useState<User[]>([])
    const [interactions, setInteractions] = useState(5.7)
    const [usersWithGoogle, setUsersWithGoogle] = useState<User[]>([])

    useEffect(() => {
        fetch(`${API_URL}/api/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
    }, [])

    useEffect(() => {
        if (users.length > 0) {
            const authors = users.filter((user) => user.role === 'author')
            setAuthors(authors)
            const admins = users.filter((user) => user.role === 'admin')
            setAdmins(admins)
            const usersWithGoogle = users.filter((user) => user.googleId !== '')
            setUsersWithGoogle(usersWithGoogle)

            const totalInteractions = users.reduce((acc) => acc + 13.5, 0)
            setInteractions(totalInteractions / users.length)
        }
    }, [users])

    useEffect(() => {
        fetch(`${API_URL}/api/users/count`)
            .then((response) => response.json())
            .then((data) => setUserCount(data.count))
    }, [])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <HiOutlineUserGroup className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{userCount}</div>
                    <p className="text-xs text-muted-foreground">
                        {((usersWithGoogle.length / userCount) * 100).toFixed(
                            0
                        )}
                        % of total users {'('}
                        {`${usersWithGoogle.length} ${
                            usersWithGoogle.length > 1 ? 'users' : 'user'
                        }`}
                        {')'} use Google
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Authors
                    </CardTitle>
                    <HiOutlinePencilAlt className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{authors.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {((authors.length / userCount) * 100).toFixed(0)}% of
                        total users
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Admins
                    </CardTitle>
                    <HiOutlineShieldCheck className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{admins.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {((admins.length / userCount) * 100).toFixed(0)}% of
                        total users
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Interactions
                    </CardTitle>
                    <HiOutlineCursorClick className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{interactions}</div>
                    <p className="text-xs text-muted-foreground">
                        Average interactions per user
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
