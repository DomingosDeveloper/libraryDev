import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { UpdateBookParams } from '../../backend/src/controller/update-book/protocol';
import { Book } from '../../backend/src/models/book';

const BookListEdit = (book : Book) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedObject, setSelectedObject] = useState();
    const [editValue, setEditValue] = useState('');
    
 const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {

    setIsEditing(false);
    };

    const handleClose = () => {
    setIsEditing(false);
    };

    return (
    <div>
        {isEditing && (
        <div className="modal">
            <h2>Edit {book.title}</h2>
            <input type="text" name="" value={book.author}  onChange={(e) => setEditValue(e.target.value)}/>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleClose}>Cancel</button>
        </div>
        )}
    </div>
    );
};

export default BookListEdit;