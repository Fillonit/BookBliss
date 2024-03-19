// import React from "react";
// import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import Home from "@/pages/Homepage";
import Navbar from "@/components/Layout/Navbar";
import BookList from "@/components/Book/BookList";
import AboutUs from "@/components/About/about"; 
import Login from "./components/User/Login";
// import { useState } from "react";

// import "./App.css";
import Footer from "@/components/Layout/Footer";
import Register from "./components/User/Register";
// import Hero from "@/components/Book/Hero";
function App() {
	// const [userId, setUserId] = useState(localStorage.getItem("userId"));
	return (
		<Router>
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
							element={<Login />}
						/>
						<Route
							path="/register"
							element={<Register />}
							/>
						{/* <Route
							path="/dashboard/:table"
							element={<PrivateRoute element={<Dashboard />} />}
						/>  */}
					</Routes>
					{!window.location.pathname.includes("/dashboard") && !window.location.pathname.includes("/login") && !window.location.pathname.includes("/register") && (
						<Footer />
					)}
				</div>
				<DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white bg-purple-400 hover:bg-purple-600 dark:hover:bg-purple-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0" />
			</Flowbite>
		</Router>
	);
}

export default App;
