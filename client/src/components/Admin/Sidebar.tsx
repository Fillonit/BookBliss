// import { API_BASE_URL } from "../../config";

'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiBookOpen, HiMail, HiUser, HiOutlineInbox } from 'react-icons/hi'
// import iconDark from '../../assets/iconDark.png'
// import { twMerge } from "tailwind-merge";
import { API_URL } from '@/util/envExport'

function SidebarComponent() {
    const [userCount, setUserCount] = useState<number>(0);
    const [bookCount, setBookCount] = useState<number>(0);
    const [contactCount, setContactCount] = useState<number>(0);
    const [inventoryCount, setInventoryCount] = useState<number>(0);
    const [reviewCount, setReviewCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const urls: {key: string, url: string}[] = [
            {key: 'userCount', url: `${API_URL}/api/users/count`},
            {key: 'bookCount', url: `${API_URL}/api/books/count`},
            {key: 'contactCount', url: `${API_URL}/api/contact/count`},
            {key: 'inventoryCount', url: `${API_URL}/api/inventory/count`},
            {key: 'reviewCount', url: `${API_URL}/api/review/count`}
        ] 
        const fetchData = async (url: string, key: string) =>{
            const response = await fetch(url, {
                headers: {
                    session: localStorage.getItem('sessionToken') as string
                }
            });
            const data = await response.json();
            const value = data.data;
            return {key, value};
        }
        const initialize = async ()=>{
            const promises = await Promise.all(urls.map(({key, url}) => fetchData(url, key)));
            promises.forEach(({key, value}) => {
                switch(key){
                    case 'userCount':
                        setUserCount(value);
                        break;
                    case 'bookCount':
                        setBookCount(value);
                        break;
                    case 'contactCount':
                        setContactCount(value);
                        break;
                    case 'inventoryCount':
                        setInventoryCount(value);
                        break;
                    case 'reviewCount':
                        setReviewCount(value);
                        break;
                }
            });
            setIsLoading(false);
        }
        initialize();
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
                        label={isLoading ? '...' :userCount.toString()}
                    >
                        Users
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/books" icon={HiBookOpen} 
                        theme={'gray'}
                        labelColor={'blue'}
                        label={isLoading ? '...' : bookCount.toString()}>
                        Books
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/contacts" icon={HiMail}
                     theme={'gray'}
                     labelColor={'blue'}
                     label={isLoading ? '...' :contactCount.toString()}>
                        Contacts
                    </Sidebar.Item>
                    <Sidebar.Item
                        href="/dashboard/inventory"
                        icon={HiOutlineInbox}
                        theme={'gray'}
                        labelColor={'blue'}
                        label={isLoading ? '...' : inventoryCount.toString()}
                    >
                        Inventory
                    </Sidebar.Item>
                    <Sidebar.Item href="/dashboard/reviews" icon={HiBookOpen}
                     theme={'gray'}
                     labelColor={'blue'}
                     label={isLoading ? '...' : reviewCount.toString()}>
                        Reviews
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SidebarComponent
