const AboutUs = () => {
	return (
		<section className="relative overflow-hidden bg-gradient-to-b from-amber-800/20 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40 min-h-screen">
			<svg
				className="h-[35rem] w-[200rem] flex-none stroke-amber-800 dark:stroke-amber-400 dark:opacity-30 opacity-10 absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2"
				aria-hidden="true"
			>
				<defs>
					<pattern
						id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
						width="200"
						height="200"
						x="50%"
						y="50%"
						patternUnits="userSpaceOnUse"
						patternTransform="translate(-100 0)"
					>
						<path d="M.5 200V.5H200" fill="none"></path>
					</pattern>
				</defs>
				<svg
					x="50%"
					y="50%"
					className="overflow-visible fill-blue-50 dark:fill-blue-900"
				>
					<path
						d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
						strokeWidth="0"
					></path>
				</svg>
				<rect
					width="100%"
					height="100%"
					strokeWidth="0"
					fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
				></rect>
			</svg>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 lg:pt-20">
				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
					<div className="lg:pr-8 lg:pt-4">
						<div className="lg:max-w-lg">
							<h2 className="text-base font-semibold leading-7 text-amber-700 dark:text-amber-300">
								Our Story
							</h2>
							<p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
								Bringing Books Closer to You
							</p>
							<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
								At our bookstore, we're on a mission to make the
								joy of reading accessible to everyone. Our
								journey began with a simple idea: to create a
								user-friendly platform where book lovers can
								explore, discover, and purchase their favorite
								titles with ease.
							</p>
							<p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
								We're committed to providing accurate book
								information by integrating with trusted
								databases, ensuring that you always find the
								perfect read. While our focus is on delivering
								an exceptional browsing and shopping experience,
								we leave the complexities of developing new
								recommendation algorithms and backend
								infrastructure to others.
							</p>
						</div>
						<div className="mt-10 flex items-center gap-x-6">
							<a
								href="#"
								className="rounded-md bg-amber-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
							>
								Contact Us
							</a>
						</div>
					</div>
					<img
						src="https://i.pinimg.com/originals/d9/71/b0/d971b07ec6d8cc2b05dfd00824bb20fb.jpg"
						alt="Books"
						className="w-[48rem] max-w-none max-h-[30rem] object-cover rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
					/>
				</div>
			</div>
		</section>
	);
};

export default AboutUs;
