// import React, { useEffect, useState } from 'react'
import UsersTable from '@/components/Admin/Users/UserTable'
import SidebarComponent from '@/components/Admin/Sidebar'
import { useParams } from 'react-router-dom'
import HoverCard from '@/components/Admin/Hover'
import ContactTable from '@/components/Admin/Contact/ContactTable'

// const API_BASE_URL = 'http://localhost:5000/api/'

// interface UsersData {
//     id: string
//     amount: number
//     status: 'pending' | 'processing' | 'success' | 'failed'
//     email: string
// }

const UsersInfo: React.FC = () => {
    // const [users, setUsers] = useState<UsersData[]>([])
    // const [genres, setGenres] = useState<UsersData[]>([])

    // console.log(users, genres)

    const { table } = useParams()
    // console.log(table)
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${API_BASE_URL}/${table}`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `${localStorage.getItem('token')}`,
    //                 },
    //             })

    //             const data = await response.json()
    //             {
    //                 console.log(data)
    //                 table === 'users' || table === undefined
    //                     ? setUsers(data.users)
    //                     : table === 'genres'
    //                     ? setGenres(data.genres)
    //                     : ''
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error)
    //         }
    //     }
    //     fetchData()
    // }, [])
    return (
        <div className="flex h-screen bg-[url(https://fillonit.shx.gg/6xgRkVEmj.gif)] bg-contain py-10">
            <div className="w-64 bg-white border-r dark:bg-gray-800">
                <SidebarComponent />
            </div>
            <div className="flex-1 overflow-auto overflow-y-hidden flex flex-col justify-center items-center px-12 py-6">
                <div className="w-full bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
                    {table === 'users' || table === undefined ? (
                        <UsersTable />
                    ) : table === 'contacts' ? (
                        <ContactTable /> 
                    ) : (
                        // <UsersTable />
                        <div className="self-center">
                            <p>
                                The {table} is not available, for any issues or
                                feedback please contact
                            </p>
                            <br />
                            <HoverCard />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UsersInfo