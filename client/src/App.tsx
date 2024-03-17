// import React from "react";
// import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
// import { useState } from "react";

function App() {
	// const [userId, setUserId] = useState(localStorage.getItem("userId"));
	return (
		<Router>
			<div className="min-h-screen flex flex-col ">
				{/* {!window.location.pathname.includes("/dashboard") && ( */}
				{/* <Navbar /> */}
				{/* )} */}
				<Routes>
					<Route path="/" element={<Home />} />
					{/* <Route
						path="/login"
						element={<PublicRoute element={<LoginPage />} />}
					/>
					<Route
						path="/dashboard/:table"
						element={<PrivateRoute element={<Dashboard />} />}
					/> */}
				</Routes>
				{/* {!window.location.pathname.includes("/dashboard") && <Footer />} */}
			</div>
			{/* <DarkThemeToggle className="fixed bottom-2 right-2 text-white dark:text-white bg-purple-400 hover:bg-purple-600 dark:hover:bg-purple-600 ring-0 focus:ring-0 dark:focus:ring-0 dark:ring-0" /> */}
		</Router>
	);
}

export default App;
