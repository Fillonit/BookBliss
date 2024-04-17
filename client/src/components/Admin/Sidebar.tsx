// import { API_BASE_URL } from "../../config";

'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiBookOpen, HiMail, HiUser, HiOutlineInbox } from 'react-icons/hi'
// import iconDark from '../../assets/iconDark.png'
// import { twMerge } from "tailwind-merge";
import { API_URL } from '@/util/envExport'

function SidebarComponent() {
    const [userCount, setUserCount] = useState(0)

    useEffect(() => {
        fetch(`${API_URL}/api/users/count`)
            .then((response) => response.json())
            .then((data) => setUserCount(data.count))
    }, [])
    return (
        <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        >
            <Sidebar.Logo
                href="/"
                img={
                    'https://www.freeiconspng.com/thumbs/book-icon/description-book-icon-orange-28.png'
                }
                imgAlt="Brute Force logo"
            >
                BookBliss
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        href="/dashboard/users"
                        icon={HiUser}
                        theme={'gray'}
                        labelColor={'blue'}
                        label={userCount}
                    >
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/books" icon={HiBookOpen}>
                        Books
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/contacts" icon={HiMail}>
                        Contacts
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/dashboard/inventory"
                        icon={HiOutlineInbox}
                    >
                        Inventory
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/reviews" icon={HiBookOpen}>
                        Reviews
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SidebarComponent
