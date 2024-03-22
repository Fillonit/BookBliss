// import "./App.css";
// import BookCard from "@/components/Book/BookCard";
import Hero from "@/components/Home/Hero";

// import BookImage from "@/assets/book1.jpg";

// interface BookCardProps {
// 	id: number;
// 	title: string;
// 	author: string;
// 	description: string;
// 	image: string;
// 	rating: number;
// 	popularity: number;
// 	price: number;
// 	genre: string;
// }

// const book: BookCardProps = {
// 	id: 1,
// 	title: `Book Title`,
// 	author: "Author Name",
// 	description:
// 		"Description of the book goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod lorem non posuere commodo.",
// 	image: `https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPKlQbYym2c7Ja59ztwDCkV7wGBOeNi-71zGf-IK-4lWv205wB`,
// 	rating: Math.floor(Math.random() * 5) + 1,
// 	popularity: Math.floor(Math.random() * 1000),
// 	price: Math.floor(Math.random() * 100) + 1,
// 	genre: "Fantasy",
// };
function App() {
	return (
		<>
			<Hero />
			{/* <div className="flex flex-col items-center justify-center py-2">
				<BookCard book={book} />
			</div> */}
		</>
	);
}
export default App;
