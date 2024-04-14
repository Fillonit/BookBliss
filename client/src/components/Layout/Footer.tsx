"use client";

import { faDribbble, faFacebook, faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "flowbite-react/lib/esm/components/Footer";

const footer = () => {
	return (
		<Footer container className="rounded-none">
			<div className="w-full">
				<div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
					<div>
						<div className="flex items-center">
							<a href="/" className="flex items-center">
								<img
									src="https://www.freeiconspng.com/thumbs/book-icon/description-book-icon-orange-28.png"
									alt="Book Icon"
									className="mr-3 h-6 sm:h-9"
								/>
								<span className="self-center whitespace-nowrap text-2xl text-amber-600 font-bold dark:text-white">
									BookBliss
								</span>
							</a>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
						<div>
							<Footer.Title title="about" className="font-semibold" />
							<Footer.LinkGroup col>
								<Footer.Link href="#" className="font-semibold">BookBliss</Footer.Link>
								<Footer.Link href="#" className="font-semibold">Tailwind CSS</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Follow us" className="font-semibold" />
							<Footer.LinkGroup col>
								<Footer.Link href="#" className="font-semibold">Github</Footer.Link>
								<Footer.Link href="#" className="font-semibold">Discord</Footer.Link>
							</Footer.LinkGroup>
						</div>
						<div>
							<Footer.Title title="Legal" />
							<Footer.LinkGroup col>
								<Footer.Link href="#" className="font-semibold">Privacy Policy</Footer.Link>
								<Footer.Link href="#" className="font-semibold">Terms &amp; Conditions</Footer.Link>
							</Footer.LinkGroup>
						</div>
					</div>
				</div>
				<Footer.Divider />
				<div className="w-full sm:flex sm:items-center sm:justify-between">
					<Footer.Copyright href="#" by="BookBliss™" year={2024} className="font-semibold" />
					<div className="mt-4 flex-grow flex space-x-6 sm:mt-0 sm:justify-end mr-10">
						<Footer.Icon href="#" className="text-amber-700 hover:text-amber-900" icon={() => <FontAwesomeIcon icon={faFacebook} />} />
						<Footer.Icon href="#" className="text-amber-700 hover:text-amber-900" icon={() => <FontAwesomeIcon icon={faInstagram} />} />
						<Footer.Icon href="#" className="text-amber-700 hover:text-amber-900" icon={() => <FontAwesomeIcon icon={faTwitter} />} />
						<Footer.Icon href="#" className="text-amber-700 hover:text-amber-900" icon={() => <FontAwesomeIcon icon={faGithub} />} />
						<Footer.Icon href="#" className="text-amber-700 hover:text-amber-900" icon={() => <FontAwesomeIcon icon={faDribbble} />} />
					</div>
				</div>
			</div>
		</Footer>
	);
};
export default footer;
