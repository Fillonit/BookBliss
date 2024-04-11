import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dropdown } from "../Other/Dropdown";
import { DropdownProps } from "../Other/Dropdown";
import {useEffect, useState} from "react";
import BookCard, { BookCardProps } from "../Book/BookCard";
import Loading from "../Other/Loading";

export function HomeBooks() {
  const [books, setBooks] = useState<BookCardProps[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSorting, setSelectedSorting] = useState<string>("recent");
  
  const fetchBooks = async (sorting: string) => {
    try {
        const response = await fetch(`http://localhost:5000/api/books?limit=5&offset=0&sorting=${sorting}`);
        if (response.ok) {
            const json = await response.json();
            const data: BookCardProps[] = json.data;
            setBooks(data);
            return;
        }
        alert("Failed to fetch books");
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=>{
    const fetch = async()=>{
        setLoading(true);
        await Promise.all([fetchBooks(selectedSorting)]);
        setLoading(false);
    }
    fetch();
  }, [selectedSorting])
  const filters: DropdownProps["dropdownOptions"] = 
                                   [{label: "Most recent", value: "recent"},
                                    {label: "Most popular", value: "popularity"},
                                    {label: "Most rated", value: "rating"}];
  return (
    <div>
    <Dropdown dropdownOptions={filters} defaultValue="recent" onChange={(value: string)=>setSelectedSorting(value)}/>
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      {loading && <Loading/>}
      {!loading && books && <CarouselContent>
        {books.map((book, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <BookCard {...book}/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </div>
  )
}
