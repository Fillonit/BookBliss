'use client'

import { useState } from 'react';
import { BookCardProps } from '@/types/BookCardProps'
import {
    CardTitle,
    CardContent,
    Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HiStar, HiDotsHorizontal } from 'react-icons/hi'
import { Dropdown, Modal, TextInput, Label } from 'flowbite-react'
import { API_URL } from '@/util/envExport'
import { toast } from 'react-toastify';

export default function BookCard(book: BookCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [discountTicket, setDiscountTicket] = useState<{discount: number, duration: number}>({
        duration: 0,
        discount: 0
    });

    const handleCreateDiscountTicket = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleTicketValidityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setDiscountTicket(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleModalSubmit = async () => {
        const response = await fetch(`${API_URL}/api/books/${book.id}/discount-tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'session': localStorage.getItem('sessionToken') as string
            },
            body: JSON.stringify(discountTicket)
        })
        if(!response.ok) return toast.error('Failed to create discount ticket');
        toast.success('Discount ticket created successfully');
        handleModalClose();
    };

    return (
        <Card className="flex flex-col w-full max-w-xs mx-2 bg-white rounded-lg overflow-hidden dark:bg-slate-950 shadow-md mb-2">
            <div className="relative">
                <img
                    alt="Book cover"
                    className="w-full h-64 object-cover"
                    src={`${API_URL}/files/${book.cover}`}
                />
                <span className="absolute bottom-0 left-0 bg-amber-500 text-white px-2 py-1 m-2 rounded inline-flex items-center">
                    <HiStar className="text-xl" /> {!book.rating && !book.rating ? 'N/A' : `${book.rating} (${book.ratingCount})`}
                </span>
                <span className="absolute bottom-0 right-0 bg-white text-amber-600 px-2 py-1 m-2 rounded dark:bg-slate-900 dark:text-white">
                    {(book.BookGenre && book.BookGenre[0]?.Genre.name) ??
                        'None'}
                </span>
            </div>
            <CardContent className="p-2 flex-grow mt-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-semibold mb-2 dark:text-white">
                        {book.title}
                    </CardTitle>
                    <Dropdown
                        label={<HiDotsHorizontal className="text-xl cursor-pointer dark:text-white" />}
                        inline={true}
                    >
                        <Dropdown.Item onClick={handleCreateDiscountTicket}>
                            Create discount ticket
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Add to cart
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="mt-3 flex items-center justify-between">
                <span className="text-sm font-medium bg-amber-600 p-2 rounded-md text-white">
                    {book.price.toFixed(2)} €
                </span>
            </div>
            </CardContent>

            <Modal show={isModalOpen} onClose={handleModalClose}>
                <Modal.Header>
                    Create Discount Ticket
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <div>
                            <Label htmlFor="ticketValidity" value="Ticket Validity (hours)" />
                            <TextInput
                                id="ticketValidity"
                                name="duration"
                                type="number"
                                placeholder="Enter number of hours"
                                value={discountTicket.duration}
                                onChange={handleTicketValidityChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="ticketValidity" value="Ticket percentage off" />
                            <TextInput
                                id="discount"
                                name="discount"
                                type="number"
                                placeholder="Enter discount percentage"
                                value={discountTicket.discount}
                                onChange={handleTicketValidityChange}
                                required
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleModalSubmit}>
                        Submit
                    </Button>
                    <Button onClick={handleModalClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    )
}
