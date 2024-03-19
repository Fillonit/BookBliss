// import React from "react";
// import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

// ? PAGES
import Home from "@/pages/Homepage";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import AboutUs from "@/components/About/about";
// ? COMPONENTS
import Navbar from "@/components/Layout/Navbar";
import BookList from "@/components/Book/BookList";
import Footer from "@/components/Layout/Footer";

import { PublicRoute, PrivateRoute } from "@/util/routeHandler";
function App() {
	// const [userId, setUserId] = useState(localStorage.getItem("userId"));
	return (
		<Router>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Vibes&display=swap"
					rel="stylesheet"
				/>
			</head>
			<Flowbite>
				<div className="min-h-screen flex flex-col ">
					{/* {!window.location.pathname.includes("/dashboard") && ( */}
					<Navbar />
					{/* )} */}
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/books" element={<BookList />} />
						<Route path="/about" element={<AboutUs />} />
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
							element={<PrivateRoute element={<BookList />} />}
						/>
					</Routes>
					{!window.location.pathname.includes("/dashboard") &&
						!window.location.pathname.includes("/login") &&
						!window.location.pathname.includes("/register") && (
							<Footer />
						)}
				</div>
				<DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white bg-amber-700 hover:bg-amber-900 dark:hover:bg-amber-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0" />
			</Flowbite>
		</Router>
	);
}

export default App;
