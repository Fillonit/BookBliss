import { API_URL } from '@/util/envExport'
import { useState, useEffect } from 'react'

const SidebarProfile = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [initialName, setInitialName] = useState('')
    const [initialEmail, setInitialEmail] = useState('')

    useEffect(() => {
        fetchUserData()
    }, [])

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/user/1`)
            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }
            const userData = await response.json()
            setName(userData.name)
            setEmail(userData.email)
            setInitialName(userData.name)
            setInitialEmail(userData.email)
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const handleUpdateProfile = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const updateData: { name?: string; email?: string } = {}
        if (name !== initialName) {
            updateData.name = name
        }
        if (email !== initialEmail) {
            updateData.email = email
        }

        try {
            const response = await fetch(`${API_URL}/api/user/1`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            })
            if (!response.ok) {
                throw new Error('Failed to update profile')
            }
            const updatedData = await response.json()
            setName(updatedData.name)
            setEmail(updatedData.email)
            setInitialName(updatedData.name)
            setInitialEmail(updatedData.email)
            setDrawerOpen(false)
        } catch (error) {
            console.error('Error updating profile:', error)
        }
    }

    return (
        <>
            <div className="text-center m-5">
                <button
                    id="updateProfileButton"
                    className="text-black dark:text-white hover:bg-gray-50 bg-white shadow-md font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-slate-800 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-80 transition-colors duration-200 ease-in-out cursor-pointer"
                    type="button"
                    onClick={toggleDrawer}
                    aria-controls="drawer-update-Profile-default"
                    aria-expanded={drawerOpen ? 'true' : 'false'}
                >
                    Update Profile
                </button>
            </div>

            <div
                id="drawer-update-profile-default"
                className={`fixed top-5 left-0 z-40 mt-10 w-2/4 h-screen max-w-md p-4 overflow-y-auto transition-transform ${
                    drawerOpen ? 'translate-x-0' : '-translate-x-full'
                } bg-white dark:bg-gray-800 shadow-md dark:text-white`}
                tabIndex={drawerOpen ? 0 : -1}
                aria-labelledby="drawer-label"
                aria-hidden={!drawerOpen}
            >
                <h5
                    id="drawer-label"
                    className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
                >
                    Update Profile
                </h5>
                <button
                    type="button"
                    onClick={toggleDrawer}
                    data-drawer-dismiss="drawer-update-profile-default"
                    aria-controls="drawer-update-profile-default"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <form onSubmit={handleUpdateProfile}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="email@example.com"
                                required
                            />
                        </div>
                    </div>
                    <div className="bottom-0 left-0 flex justify-center w-full mb-[4rem] pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                        <button
                            type="submit"
                            className="w-full justify-center text-white bg-amber-700 dark:bg-slate-700 dark:hover:bg-slate-900 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-200 ease-in-out cursor-pointer"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SidebarProfile
