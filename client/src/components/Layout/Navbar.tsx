"use client";

import * as React from "react";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
// import { Badge } from "@/components/ui/badge";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useEffect, useState } from "react";

// import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const components: { title: string; href: string; description: string }[] = [
	{
		title: "Alert Dialog",
		href: "/docs/primitives/alert-dialog",
		description:
			"A modal dialog that interrupts the user with important content and expects a response.",
	},
	{
		title: "Hover Card",
		href: "/docs/primitives/hover-card",
		description:
			"For sighted users to preview content available behind a link.",
	},
	{
		title: "Progress",
		href: "/docs/primitives/progress",
		description:
			"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
	},
	{
		title: "Scroll-area",
		href: "/docs/primitives/scroll-area",
		description: "Visually or semantically separates content.",
	},
	{
		title: "Tabs",
		href: "/docs/primitives/tabs",
		description:
			"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
	},
	{
		title: "Tooltip",
		href: "/docs/primitives/tooltip",
		description:
			"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
	},
];

interface User {
	avatar: string;
	name: string;
	email: string;
}

function Component() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const sessionToken = localStorage.getItem("sessionToken");
		if (sessionToken) {
			fetch(`http://localhost:5000/api/auth/user/${sessionToken}`)
				.then((response) => response.json())
				.then((data) => setUser(data));

			console.log(user);
		}
	}, []);

	function SingOut() {
		localStorage.removeItem("sessionToken");
		window.location.href = "/login";
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
							<Avatar
								alt="User settings"
								img={
									user
										? user.avatar
										: "https://cdn-icons-png.freepik.com/512/6681/6681204.png"
								}
								rounded
							/>
						}
					>
						<Dropdown.Header>
							<span className="block text-sm">
								{user ? user.name : "Guest User"}
							</span>
							<span className="block truncate text-sm font-medium">
								{user ? user.email : "guest@bookbliss"}
							</span>
						</Dropdown.Header>
						{user ? (
							<>
								<Dropdown.Item>Dashboard</Dropdown.Item>
								<Dropdown.Item className="float-left">
									Notifications
									{/* <Badge className="ml-4 bg-amber-600 dark:text-white dark:hover:bg-white dark:hover:text-amber-600 font-bold">
									3
									</Badge> */}
								</Dropdown.Item>
								<Dropdown.Item>Settings</Dropdown.Item>
								<Dropdown.Item>Earnings</Dropdown.Item>
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
									Getting started
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
										<li className="row-span-3">
											<NavigationMenuLink asChild>
												<a
													className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
													href="/"
												>
													<Icons.logo className="h-6 w-6" />
													<div className="mb-2 mt-4 text-lg font-medium">
														BookBliss
													</div>
													{/* <p className="text-sm leading-tight text-muted-foreground">
													Beautifully designed
													components that you can copy
													and paste into your apps.
													Accessible. Customizable.
													Open Source.
												</p> */}
												</a>
											</NavigationMenuLink>
										</li>
										<ListItem
											href="/docs"
											title="Introduction"
										>
											Re-usable components built using
											Radix UI and Tailwind CSS.
										</ListItem>
										<ListItem
											href="/docs/installation"
											title="Installation"
										>
											How to install dependencies and
											structure your app.
										</ListItem>
										<ListItem
											href="/docs/primitives/typography"
											title="Typography"
										>
											Styles for headings, paragraphs,
											lists...etc
										</ListItem>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger>
									Components
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
								<a href="/docs">
									<NavigationMenuLink
										className={navigationMenuTriggerStyle()}
									>
										Documentation
									</NavigationMenuLink>
								</a>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default Component;

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
	);
});
ListItem.displayName = "ListItem";
