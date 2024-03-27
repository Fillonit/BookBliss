import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

export function PrivateRoute({
	element,
	...props
}: React.ComponentProps<typeof Route>) {
	const [role, setRole] = useState<string | null>(null);

	useEffect(() => {
		const sessionToken = localStorage.getItem("sessionToken");

		if (sessionToken) {
			fetch(`${API_BASE_URL}/users/me`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionToken}`,
				},
			})
				.then((response) => response.json())
				.then((data) => {
					setRole(data.user.role);
				})
				.catch((error) => console.error(error));
		}
	}, []);

	if (role === null) {
		return null; // or a loading spinner
	} else if (role === "admin") {
		return React.cloneElement(
			element as React.ReactElement<unknown>,
			props
		);
	} else {
		return <Navigate to="/" />;
	}
}

export function PublicRoute({
	element,
	...props
}: React.ComponentProps<typeof Route>) {
	const sessionToken = localStorage.getItem("sessionToken");

	if (!sessionToken) {
		return React.cloneElement(
			element as React.ReactElement<unknown>,
			props
		);
	} else {
		return <Navigate to="/" />;
	}
}

export default PrivateRoute;
