import { useEffect, useState } from "react";
import BookCard, {BookCardProps} from "./BookCard";
import { TextField } from '@mui/material';
import { FetchDataProps } from "@/interfaces/FetchData";



const BookList = () => {
	const [books, setBooks] = useState<BookCardProps[]>([]); 
	const [bookCount, setBookCount] = useState<number>(0); // This will be used to determine the number of books to show on the page
	const [fetchData, setFetchData] = useState<FetchDataProps>({
		offset: 0,
		limit: 8,// Initially show 8 books
		query: "",
		genre: [],
	});
	const [loading, setLoading] = useState<boolean>(false);

	const fetchBooks = async (fetchData: FetchDataProps) => {
		try{
	    	const response = await fetch(
	   		`http://localhost:5000/books?offset=${fetchData.offset}&limit=${fetchData.limit}&query=${fetchData.query}&genre=${fetchData.genre}` // recommend that the server base url to be moved to a variable, so that when it changes, we dont have to change the base url of every fetch request
	    	);
			if(response.ok){
				const json = await response.json();
				const data: BookCardProps[] = json.data;
				setBooks(data);
				return;
			} 

	    }catch(e){
			console.log(e);
		}  
	}
	const fetchBookCount = async (fetchData: FetchDataProps) => {
		try{
	    	const response = await fetch(
	   		`http://localhost:5000/books?query=${fetchData.query}&genre=${fetchData.genre}` // recommend that the server base url to be moved to a variable, so that when it changes, we dont have to change the base url of every fetch request
	    	);
			if(response.ok){
				const json = await response.json();
				const data: number = json.data;
				setBookCount(data);
				return;
			} 

	    }catch(e){
			console.log(e);
		}  
	}
    useEffect(() => {
		async function fetchBookData(){
		    await Promise.all([fetchBooks(fetchData), fetchBookCount(fetchData)]);
			setLoading(false);
	    }
        fetchBookData();
	}, [])
	return (
		<div className="flex flex-col pt-20 bg-gradient-to-r from-yellow-800 to-amber-800">
		<div className="flex justify-center pb-16 mt-10">
			<div className="flex justify-between items-center ms-20 ">
				<TextField
    			type="text"
   			    placeholder="Search..."
  			    variant="outlined"
   			    fullWidth
   			    size="medium"
			    InputProps={{
    			className: 'bg-white',
    		    style: { borderColor: '#FF9800' },
    		    classes: {
   			       root: 'text-amber-700 shadow-lg font-bold',
   		        input: 'px-4 placeholder-amber-800/90 outline-none focus:outline-none',
   			     },
   		      }}
  		        value={fetchData.query}
  			  />
			</div>
		   </div>
			<div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{books.map((book: BookCardProps) => (
					<BookCard
						key={book.id}
						id={book.id}
						title={book.title}
						author={book.author}
						description={book.description}
						image={book.image}
						rating={book.rating}
						popularity={book.popularity}
						price={book.price}
						genre={book.genre}
					/>
				))}				
			{/*add some sort of pagination here*/}													
		</div>
	 </div>
	);
};

export default BookList;
