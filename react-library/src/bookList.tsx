import React, { useEffect, useState } from 'react';
import { Book } from '../../backend/src/models/book';
import axios from 'axios';
import BookListEdit from './bookListEdit';
import { Route, Router } from 'react-router-dom';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const [isEditVisible, setEditIsVisible] = useState(false);
    const toggleEditDiv = () => {
        setEditIsVisible(!isEditVisible);
      };
   

    useEffect(() => {
      const updateBooks = async () => {
          const response = await axios.get<Book[]>('http://localhost:3000/books');
          setBooks(response.data);
      }; 
     
  
      updateBooks();
    }, []);
  
    return (
    <div>
        <ul>
            {books.map((book) => (
                <li>
                    <div className='bookCard' key={book.id}> 
                    {book.title} {book.author} - {book.publishedYear} - {book.subject} - {book.quantity}
                    <button onClick={toggleEditDiv}> 
                        Edit 
                    </button>
                    {isEditVisible && <BookListEdit title={book.title} author={book.author} publishedYear={book.publishedYear} subject={book.subject} quantity={book.quantity} />}

                    <button> Delete </button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default BookList;