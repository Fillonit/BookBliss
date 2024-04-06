import { useState } from "react";
import { toast, ToastContainer, UpdateOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
	const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '', name: '' });
	const [formErrors, setFormErrors] = useState({ email: '', password: '', confirmPassword: '', name: '' });

	const validateForm = () => {
		let newErrors = { email: '', password: '', confirmPassword: '', name: '' };

		if (!formValues.email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
			newErrors.email = 'Email is invalid';
		}

		if (!formValues.password) {
			newErrors.password = 'Password is required';
		} else if (formValues.password.length < 3) {
			newErrors.password = 'Password must be at least 8 characters';
		}

		if (!formValues.confirmPassword) {
			newErrors.confirmPassword = 'Confirm password is required';
		} else if (formValues.password !== formValues.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setFormErrors(newErrors);
		return Object.values(newErrors).every(error => !error);
	};
	const handleSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (validateForm()) {
			const SignUpToast = toast("Signing Up...", {
				autoClose: 3000,
			});
			try {
				const response = await fetch(`http://localhost:5000/api/register`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: formValues.email,
						password: formValues.password,
						name: formValues.name
					}),
				});
				const data = await response.json();
				console.log(data);
				if (response.status === 201) {
					toast.update(SignUpToast, {
						render: "Signed Up Successfully!",
						type: "success",
					} as UpdateOptions<unknown>);
					setTimeout(() => {
						window.location.href = "/login";
					}, 1000);
				} else {
					toast.update(SignUpToast, {
						render: `${data.message}!`,
						type: "error",
					} as UpdateOptions<unknown>);
				}
			} catch (error) {
				toast.update(SignUpToast, {
					render: "Sign Up Failed!",
					type: "error",
				} as UpdateOptions<unknown>);
				console.error(error);
			}
		}
	};

	const handleChange = (event: { target: { id: any; value: any; }; }) => {
		setFormValues({ ...formValues, [event.target.id]: event.target.value });
	};

	return (
		<div className="flex flex-wrap">
			<ToastContainer />
			<div className="flex w-full flex-col md:w-1/2">
				<div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
					<p className="text-left text-3xl font-bold">Welcome</p>
					<p className="mt-2 text-left text-gray-500">
						Welcome please enter your details.
					</p>
					<button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white">
						<img
							className="mr-2 h-5"
							src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
						/>{" "}
						Sign Up with Google
					</button>
					<div className="relative mt-8 flex h-px place-items-center bg-gray-200">
						<div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
							or
						</div>
					</div>
					<form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
					<div className="flex flex-col pt-4">
							<div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
								<input
									type="name"
									id="name"
									className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
									placeholder="Name"
									value={formValues.name}
									onChange={handleChange}
								/>
								{formErrors.name && <p>{formErrors.name}</p>}
							</div>
						</div>
						<div className="flex flex-col pt-4">
							<div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
								<input
									type="email"
									id="email"
									className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
									placeholder="Email"
									value={formValues.email}
									onChange={handleChange}
								/>
								{formErrors.email && <p>{formErrors.email}</p>}
							</div>
						</div>
						<div className="flex flex-col pt-4">
							<div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
								<input
									type="password"
									id="password"
									className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
									placeholder="Password"
									value={formValues.password}
									onChange={handleChange}
								/>
								{formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
							</div>
						</div>
						<div className="flex flex-col pt-4">
							<div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
								<input
									type="password"
									id="confirmPassword"
									className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
									placeholder="Confirm Password"
									value={formValues.confirmPassword}
									onChange={handleChange}
								/>
								{formErrors.confirmPassword && <p className="text-red-500">{formErrors.confirmPassword}</p>}
							</div>
						</div>
						<button
							type="submit"
							className="w-full rounded-lg bg-amber-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 mt-10"
						>
							Sign Up
						</button>
					</form>
					<div className="py-12 text-center">
						<p className="whitespace-nowrap text-gray-600">
							Already have an account?
							<a
								href="/login"
								className="underline-offset-4 font-semibold text-amber-900 underline"
							>
								{" "}
								have and Account?
							</a>
						</p>
					</div>
				</div>
			</div>
			<div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
				<div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
					<p className="mb-8 text-3xl font-semibold leading-10">
						We offer a wide range of books faster than our
						competitors and maintain a consistent inventory. While
						they're struggling with supply issues, we're releasing
						new titles.
					</p>
					<p className="mb-4 text-3xl font-semibold">John doe</p>
					<p className="">Founder, BookBliss</p>
					<p className="mb-7 text-sm opacity-70">Online Bookstore</p>
				</div>
				<img
					className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
					src="https://source.unsplash.com/random/?Books"
				/>
			</div>
		</div>
	);
};

export default Register;
