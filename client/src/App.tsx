// import React from "react";
// import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DarkThemeToggle, Flowbite } from 'flowbite-react'
import { ThemeProvider } from '@/components/theme-provider'

// ? PAGES
import Home from '@/pages/Homepage'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import AboutUs from '@/components/About/about'
import Dashboard from '@/components/Admin/Dashboard'
import Contact from '@/pages/Contact'
import BooksPage from './pages/Books'
import ApplicationForm from './pages/Apply'
import SingleCard from '@/components/SingleCard/singleCard'

// ? COMPONENTS
import Navbar from '@/components/Layout/Navbar'
import BookList from '@/components/Book/BookList'
import Footer from '@/components/Layout/Footer'

import { PublicRoute, PrivateRoute } from '@/util/routeHandler'
import Profile from './components/User/Profile'
import CreateBook from './pages/CreateBook'
function App() {
    // const [userId, setUserId] = useState(localStorage.getItem("userId"));
    return (
        <Router>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Vibes&display=swap"
                    rel="stylesheet"
                />
            </head>
            <Flowbite>
                <ThemeProvider
                    defaultTheme="dark"
                    storageKey="flowbite-theme-mode"
                >
                    <div className="min-h-screen flex flex-col ">
                        {/* {!window.location.pathname.includes("/dashboard") && ( */}
                        <Navbar />
                        {/* )} */}
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/books" element={<BooksPage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route
                                path="/apply"
                                element={<ApplicationForm />}
                            />
                            <Route
                                path="/singleCard/:id"
                                element={<SingleCard />}
                            />
                            <Route
                                path="/login"
                                element={<PublicRoute element={<Login />} />}
                            />
                            <Route
                                path="/register"
                                element={<PublicRoute element={<Register />} />}
                            />
                            <Route
                                path="/admin"
                                element={
                                    <PrivateRoute
                                        requiredRole="admin"
                                        element={<BookList />}
                                    />
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute
                                        requiredRole="admin"
                                        element={<Dashboard />}
                                    />
                                }
                            />
                            <Route
                                path="/book/create"
                                element={
                                    <PrivateRoute
                                        requiredRole="author"
                                        element={<CreateBook />}
                                    />
                                }
                            />
                            <Route
                                path="/dashboard/:table"
                                element={
                                    <PrivateRoute
                                        requiredRole="admin"
                                        element={<Dashboard />}
                                    />
                                }
                            />
                            <Route path="/profile" element={<Profile />} />
                            {/* <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                                path="/dashboard/:table"
                                element={<Dashboard />}
                            /> */}
                        </Routes>
                        {!window.location.pathname.includes('/dashboard') &&
                            !window.location.pathname.includes('/login') &&
                            !window.location.pathname.includes('/register') && (
                                <Footer />
                            )}
                    </div>
                    <DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white bg-amber-700 hover:bg-amber-900 dark:hover:bg-amber-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0" />
                </ThemeProvider>
            </Flowbite>
        </Router>
    )
}

export default App
