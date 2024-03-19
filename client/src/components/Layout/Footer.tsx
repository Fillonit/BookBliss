import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFacebook,
	faInstagram,
	faTwitter,
	faGithub,
	faDribbble,
} from "@fortawesome/free-brands-svg-icons";
import {
	faPhone,
	faEnvelope,
	faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const footer = () => {
	return (
		<footer className="bg-white dark:bg-gray-800">
			<div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div>
						<div className="flex justify-center text-amber-900 dark:text-amber-100 sm:justify-start">
							<h1 className="text-3xl font-bold">BookBliss</h1>
						</div>

						<p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 dark:text-gray-400 sm:max-w-xs sm:text-left">
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Incidunt consequuntur amet culpa cum itaque
							neque.
						</p>

						<ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
							<li>
								<a
									href="#"
									rel="noreferrer"
									target="_blank"
									className="text-amber-900 transition hover:text-amber-600/75 dark:hover:text-amber-500 dark:text-amber-600"
								>
									<span className="sr-only">Facebook</span>
									<FontAwesomeIcon
										icon={faFacebook}
										className="h-6 w-6"
									/>
								</a>
							</li>

							<li>
								<a
									href="#"
									rel="noreferrer"
									target="_blank"
									className="text-amber-900 transition hover:text-amber-800/75 dark:hover:text-amber-500 dark:text-amber-600"
								>
									<span className="sr-only">Instagram</span>
									<FontAwesomeIcon
										icon={faInstagram}
										className="h-6 w-6"
									/>
								</a>
							</li>

							<li>
								<a
									href="#"
									rel="noreferrer"
									target="_blank"
									className="text-amber-900 transition hover:text-amber-800/75 dark:hover:text-amber-500 dark:text-amber-600"
								>
									<span className="sr-only">Twitter</span>
									<FontAwesomeIcon
										icon={faTwitter}
										className="h-6 w-6"
									/>
								</a>
							</li>

							<li>
								<a
									href="#"
									rel="noreferrer"
									target="_blank"
									className="text-amber-900 transition hover:text-amber-800/75 dark:hover:text-amber-500 dark:text-amber-600"
								>
									<span className="sr-only">GitHub</span>
									<FontAwesomeIcon
										icon={faGithub}
										className="h-6 w-6"
									/>
								</a>
							</li>

							<li>
								<a
									href="#"
									rel="noreferrer"
									target="_blank"
									className="text-amber-900 transition hover:text-amber-800/75 dark:hover:text-amber-500 dark:text-amber-600"
								>
									<span className="sr-only">Dribbble</span>
									<FontAwesomeIcon
										icon={faDribbble}
										className="h-6 w-6"
									/>
								</a>
							</li>
						</ul>
					</div>

					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-gray-900 dark:text-white">
								About Us
							</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										Company History
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										Meet the Team
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										Employee Handbook
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										{" "}
										Careers{" "}
									</a>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-gray-900 dark:text-white">
								Our Services
							</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										Web Development
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										{" "}
										Web Design{" "}
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										{" "}
										Marketing{" "}
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										{" "}
										Google Ads{" "}
									</a>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-gray-900 dark:text-white">
								Helpful Links
							</p>

							<ul className="mt-8 space-y-4 text-sm">
								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										{" "}
										FAQs{" "}
									</a>
								</li>

								<li>
									<a
										className="text-gray-700 transition hover:text-gray-700/75 dark:text-white"
										href="#"
									>
										{" "}
										Support{" "}
									</a>
								</li>
							</ul>
						</div>

						<div className="text-center sm:text-left">
							<p className="text-lg font-medium text-gray-900 dark:text-white">
								Contact Us
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mt-8">
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									className="h-6 w-6 text-amber-700 transition hover:text-amber-800/75 mr-2"
								/>
								<p className='w-full sm:w-auto text-center mt-2"'>
									123 Main Street
								</p>
							</div>
							<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mt-2">
								<FontAwesomeIcon
									icon={faPhone}
									className="h-6 w-6 text-amber-700 transition hover:text-amber-800/75 mr-2"
								/>
								<p className='w-full sm:w-auto text-center mt-2"'>
									(123) 456-7890
								</p>
							</div>
							<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start mt-2">
								<FontAwesomeIcon
									icon={faEnvelope}
									className="h-6 w-6 text-amber-700 transition hover:text-amber-800/75 mr-2"
								/>
								<p className='w-full sm:w-auto text-center mt-2"'>
									info@example.com
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t border-gray-100 dark:border-gray-700 pt-6">
					<div className="text-center sm:flex sm:justify-between sm:text-left">
						<p className="text-sm text-gray-500 dark:text-gray-400">
							<span className="block sm:inline">
								All rights reserved.{" "}
							</span>

							<a
								className="inline-block text-amber-500 dark:text-amber-400 underline transition hover:text-amber-500/75 dark:hover:text-amber-300"
								href="#"
							>
								Terms & Conditions
							</a>

							<span> &middot;</span>

							<a
								className="inline-block text-amber-500 dark:text-amber-400 underline transition hover:text-amber-500/75 dark:hover:text-amber-300"
								href="#"
							>
								Privacy Policy
							</a>
						</p>

						<p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:order-first sm:mt-0">
							&copy; 2024 BookBliss
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default footer;
