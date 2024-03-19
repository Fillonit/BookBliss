import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoodreads } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface BookCardProps {
	id: number;
	title: string;
	author: string;
	description: string;
	image: string;
	rating: number;
	popularity: number;
	price: number;
	genre: string;
}

export default function BookCard({ book }: BookCardProps) {
	return (
		<div
			className="w-full max-w-sm border border-gray-200 rounded-lg shadow relative overflow-hidden min-h-[30vh] bg-center bg-cover"
			style={{ backgroundImage: `url(${book.image})` }}
		>
			<div className="px-5 pb-5 bg-white bg-opacity-0 hover:bg-opacity-90 transition-all duration-500 absolute inset-0 flex flex-col justify-end space-y-4">
				<a href="#">
					<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-8">
						{book.title}
					</h5>
				</a>
				<div className="flex items-center mt-2.5 mb-5">
					<div className="flex items-center space-x-1 rtl:space-x-reverse">
						<FontAwesomeIcon
							icon={faStar}
							className="text-yellow-300"
						/>
					</div>
					<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
						{book.rating}
					</span>
				</div>
				<div className="flex items-center justify-between mb-4">
					<span className="text-3xl font-bold text-gray-900 dark:text-white">
						${book.price}
					</span>
					<a
						href="#"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Add to cart
					</a>
				</div>
				<a href={book.id} className="absolute bottom-4 right-4">
					<FontAwesomeIcon
						icon={faGoodreads}
						className="text-gray-900 dark:text-white text-xl"
					/>
				</a>
			</div>
		</div>
	);
}
