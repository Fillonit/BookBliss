'use client'

import * as React from 'react'

import { Dropdown, Navbar } from 'flowbite-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
// import { Badge } from "@/components/ui/badge";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/util/envExport'

// import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Books',
        href: '/books',
        description: 'A written or printed work consisting of pages.',
    },
    {
        title: 'Novels',
        href: '/novels',
        description:
            'A long fictional narrative in prose, typically published as a book.',
    },
    {
        title: 'Comics',
        href: '/comics',
        description:
            'A publication that consists of comic art in the form of sequential panels.',
    },
    {
        title: 'Manga',
        href: '/manga',
        description: 'Japanese comic books and graphic novels.',
    },
    // {
    //     title: 'Biographies',
    //     href: '/books/biographies',
    //     description: 'An account of someone’s life written by someone else.',
    // },
    // {
    //     title: 'Sci-Fi',
    //     href: '/books/sci-fi',
    //     description:
    //         'A genre of speculative fiction that deals with futuristic concepts.',
    // },
    // {
    //     title: 'Fantasy',
    //     href: '/books/fantasy',
    //     description:
    //         'A genre of speculative fiction set in a fictional universe.',
    // },
]

interface User {
    id: number
    avatar: string
    name: string
    email: string
    role: string
}

function NavbarComponent() {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const sessionToken = localStorage.getItem('sessionToken')
        if (sessionToken) {
            fetch(`${API_URL}/api/auth/user/${sessionToken}`)
                .then((response) => {
                    if (!response.ok) {
                        localStorage.removeItem('sessionToken')
                        window.location.href = '/login'
                        throw new Error('Network response was not ok')
                    }
                    return response.json()
                })
                .then((data) => {
                    if (data.status === 400) {
                        localStorage.removeItem('sessionToken')
                        window.location.href = '/login'
                    } else {
                        setUser(data)
                    }
                })
                .catch((error) => {
                    console.log(
                        'There has been a problem with your fetch operation: ',
                        error.message
                    )
                    toast.error('Failed to load user data. Please try again.', {
                        theme:
                            localStorage.getItem('flowbite-theme-mode') ===
                            'dark'
                                ? 'dark'
                                : 'light',
                    })
                })
        }
    }, [])

    function SingOut() {
        localStorage.removeItem('sessionToken')
        window.location.href = '/login'
    }
    return (
        <div className="fixed top-0 w-full z-50">
            <Navbar fluid className="bg-white z-50 shadow-md">
                <Navbar.Brand href="/">
                    <img
                        src="https://www.freeiconspng.com/thumbs/book-icon/description-book-icon-orange-28.png"
                        alt=""
                        className="mr-3 h-6 sm:h-9"
                    />
                    <span className="self-center whitespace-nowrap text-2xl text-amber-600 font-bold dark:text-white">
                        BookBliss
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar>
                                <AvatarImage src={user?.avatar} alt="Avatar" />
                                <AvatarFallback className="uppercase">
                                    {user?.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                </AvatarFallback>
                            </Avatar>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user ? user.name : 'Guest User'}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {user ? user.email : 'guest@bookbliss'}
                            </span>
                        </Dropdown.Header>
                        {user && user.role == 'admin' && (
                            <Dropdown.Item href={'/dashboard'}>
                                Dashboard
                            </Dropdown.Item>
                        )}
                        {user && user.role == 'author' && (
                            <Dropdown.Item href={'/book/create'}>
                                Create a book
                            </Dropdown.Item>
                        )}
                        {user ? (
                            <>
                                <Dropdown.Item href={`/profile`}>
                                    Profile
                                </Dropdown.Item>
                                <Dropdown.Item className="float-left">
                                    Notifications
                                    {/* <Badge className="ml-4 bg-amber-600 dark:text-white dark:hover:bg-white dark:hover:text-amber-600 font-bold">
            3
            </Badge> */}
                                </Dropdown.Item>
                                <Dropdown.Item href={'/settings'}>
                                    Settings
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={SingOut}>
                                    Sign out
                                </Dropdown.Item>
                            </>
                        ) : (
                            <>
                                <Dropdown.Item href="/login">
                                    Sign in
                                </Dropdown.Item>
                                <Dropdown.Item href="/register">
                                    Sign up
                                </Dropdown.Item>
                            </>
                        )}
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Explore
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b   from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <Icons.logo className="h-6 w-6 text-amber-600" />
                                                    <div className="mb-2 mt-4 text-lg font-bold text-amber-600">
                                                        BookBliss
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        <p className="text-sm">
                                                            Dive into the World
                                                            of Books.
                                                        </p>{' '}
                                                        Discover, explore and
                                                        lose yourself in our
                                                        vast collection of books
                                                        across multiple genres.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href="/books/popular"
                                            title="Popular Books"
                                        >
                                            Discover the most popular books
                                            across multiple genres.
                                        </ListItem>
                                        <ListItem
                                            href="/books/recent"
                                            title="Recent Books"
                                        >
                                            Explore the latest books added to
                                            our collection.
                                        </ListItem>
                                        <ListItem
                                            href="/books/featured"
                                            title="Featured Books"
                                        >
                                            Explore the books that we love.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Works
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Reach Us
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        <ListItem
                                            title="Contact"
                                            href="/contact"
                                        >
                                            Reach out to us for any queries or
                                            feedback.
                                        </ListItem>
                                        <ListItem
                                            title="Features"
                                            href="https://roadmap.bookbliss.logic-nest.me"
                                            target="_blank"
                                        >
                                            Request a feature or suggest an idea
                                            for the platform.
                                        </ListItem>
                                        <ListItem
                                            title="Contribute"
                                            href="/contribute"
                                        >
                                            Contribute to the platform by
                                            submitting your work.
                                        </ListItem>
                                        <ListItem title="Apply" href="/apply">
                                            Apply for an author account to start
                                            publishing your work.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            {/* <NavigationMenuItem>
                                <a href="/contact">
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Contact
                                    </NavigationMenuLink>
                                </a>
                            </NavigationMenuItem> */}
                            <NavigationMenuItem>
                                <a href="/about">
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        About
                                    </NavigationMenuLink>
                                </a>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </Navbar.Collapse>
            </Navbar>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default NavbarComponent

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink>
                <a
                    ref={ref}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = 'ListItem'
