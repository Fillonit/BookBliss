import { API_URL } from '@/util/envExport'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast, UpdateOptions } from 'react-toastify'

const LoginPage = () => {
    // const [showPassword, setShowPassword] = useState(false);

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };
    const [formValues, setFormValues] = useState({ email: '', password: '' })
    const [formErrors] = useState({ email: '', password: '' })

    // const validateForm = () => {
    //     let newErrors = { email: '', password: '' }

    //     if (!formValues.email) {
    //         newErrors.email = 'Email is required'
    //     } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    //         newErrors.email = 'Email is invalid'
    //     }

    //     if (!formValues.password) {
    //         newErrors.password = 'Password is required'
    //     } else if (formValues.password.length < 8) {
    //         newErrors.password = 'Password must be at least 8 characters'
    //     }

    //     setFormErrors(newErrors)
    //     return Object.values(newErrors).every((error) => !error)
    // }

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        const SignInToast = toast('Signing In...', {
            autoClose: 3000,
        })
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formValues.email,
                    password: formValues.password,
                }),
            })
            const data = await response.json()
            console.log(data)
            if (response.status === 200) {
                localStorage.setItem('sessionToken', data.sessionToken)
                // localStorage.setItem('user', JSON.stringify(data))
                toast.update(SignInToast, {
                    render: 'Signed In Successfully!',
                    type: 'success',
                    // ...notifyConfig,
                } as UpdateOptions<unknown>)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            } else {
                toast.update(SignInToast, {
                    render: `${data.message}!`,
                    type: 'error',
                    // ...notifyConfig,
                } as UpdateOptions<unknown>)
            }
        } catch (error) {
            toast.update(SignInToast, {
                render: 'Sign In Failed!',
                type: 'error',
                //...notifyConfig,
            } as UpdateOptions<unknown>)
            console.error(error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [event.target.id]: event.target.value })
    }
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const googleId = params.get('id')

        if (googleId) {
            fetch(`${API_URL}/api/user/getByGoogleId/${googleId}`)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(`${JSON.stringify(data)}`);
                    // localStorage.setItem("userId", data.id);
                    // localStorage.setItem(
                    // 	"user",
                    // 	JSON.stringify({ ...data, password: "" })
                    // );
                    localStorage.setItem('sessionToken', data.sessionToken)
                    window.location.href = '/'
                })
                .catch((error) => {
                    window.location.href = '/login'
                    console.error(error)
                })
        }
    }, [location])

    return (
        <div className="flex flex-wrap">
            <div className="flex w-full flex-col md:w-1/2">
                <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
                    <p className="text-left text-3xl font-bold">Welcome</p>
                    <p className="mt-2 text-left text-gray-500">
                        Welcome please enter your details.
                    </p>
                    <button
                        className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-black hover:text-white"
                        onClick={() =>
                            (window.location.href = `${API_URL}/auth/google`)
                        }
                    >
                        <img
                            className="mr-2 h-5"
                            src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                        />{' '}
                        Log in with Google
                    </button>
                    <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                        <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white dark:bg-background text-center text-sm text-gray-500 dark:text-gray-200 px-2">
                            or
                        </div>
                    </div>
                    <form
                        className="flex flex-col pt-3 md:pt-8"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Email"
                                    value={formValues.email}
                                    onChange={(event) => {
                                        handleChange(event)
                                    }}
                                />
                                {formErrors.email && <p>{formErrors.email}</p>}
                            </div>
                        </div>
                        <div className="mb-12 flex flex-col pt-4">
                            <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full flex-1 appearance-none border-none bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="Password"
                                    value={formValues.password}
                                    onChange={(event) => {
                                        handleChange(event)
                                    }}
                                />
                                {formErrors.password && (
                                    <p className="text-red-500">
                                        {formErrors.password}
                                    </p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="submit"
                            className="w-full rounded-lg bg-amber-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
                        >
                            Log in
                        </button>
                    </form>
                    <div className="py-12 text-center">
                        <p className="whitespace-nowrap text-gray-600">
                            Don't have an account?
                            <a
                                href="/register"
                                className="underline-offset-4 font-semibold text-amber-900 underline"
                            >
                                {' '}
                                Sign up for free.
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
    )
}

export default LoginPage
