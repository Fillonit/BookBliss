import { API_URL } from '@/util/envExport'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Settings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match')
            return
        }

        if (!validatePasswordStrength(newPassword)) {
            setMessage('Password must be at least 5 characters long.')
            return
        }

        try {
            const response = await fetch(`${API_URL}/api/profile/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    session: localStorage.getItem('sessionToken') || '',
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            })

            const data = await response.json()

            if (response.ok) {
                setMessage('Password updated successfully')
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                toast.success('Password updated successfully')
            } else {
                setMessage(data.message || 'Failed to update password')
                toast.error(data.message || 'Failed to update password')
            }
        } catch (error) {
            console.error('Error:', error)
            setMessage('An error occurred while updating the password')
            toast.error('An error occurred while updating the password')
        }
    }

    const validatePasswordStrength = (password: string) => {
        const minLength = 4
        const hasNumber = /\d/

        return password.length >= minLength && hasNumber.test(password)
    }

    return (
        <section className="text-gray-600 body-font">
            <ToastContainer />
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-gray-900">
                        Change Your Password
                    </h1>
                    <p className="leading-relaxed mt-4">
                        Ensure your account is secure by updating your password
                        regularly.
                    </p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 shadow-lg rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                        Change Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="relative mb-4">
                            <label
                                htmlFor="current-password"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="current-password"
                                name="current-password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="new-password"
                                className="leading-7 text-sm text-gray-600"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                id="new-password"
                                name="new-password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="relative mb-4">
                            <label
                                htmlFor="confirm-password"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="text-white bg-amber-500 border-0 py-2 px-8 focus:outline-none hover:bg-amber-600 rounded text-lg"
                        >
                            Update Password
                        </button>
                    </form>
                    {message && (
                        <p className="text-xs text-gray-500 mt-3">{message}</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Settings
