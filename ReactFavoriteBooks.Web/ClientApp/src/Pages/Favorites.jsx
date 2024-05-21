import React, { useState, useEffect } from 'react';
import axios from "axios";

const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [viewingBookId, setViewingBookId] = useState(null);
  const [note, setNote] = useState('');

  const loadFavoriteBooks = async () => {
    const { data } = await axios.get('/api/Books/GetFavorites');
    setFavoriteBooks(data);
  }

  useEffect(() => {
    loadFavoriteBooks();
  }, []);

  const onRemoveFromFavoritesClick = async (favoriteBook) => {
    await axios.post('/api/Books/removefromfavorites', { favoriteBookId: favoriteBook.id });
    await loadFavoriteBooks();
  }

  const handleAddEditNote = (book) => {
    setEditingBookId(book.id);
    setNote(book.note || '');
    setViewingBookId(null);
  };

  const handleToggleNote = (book) => {
    if (viewingBookId === book.id) {
      setViewingBookId(null);
    } else {
      setViewingBookId(book.id);
    }
    setEditingBookId(null);
  };

  const handleSaveNote = async (bookId) => {
    await axios.post('/api/Books/SetNote', { favoriteBookId: bookId, note });
    setEditingBookId(null);
    setNote('');
    await loadFavoriteBooks();
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
    setNote('');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">My Favorites</h2>
      <div className="row">
        {favoriteBooks.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img src={book.coverUrl} className="card-img-top" alt={book.title} style={{ height: '200px', objectFit: 'contain' }} />
                <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" onClick={() => onRemoveFromFavoritesClick(book)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{book.title}</h5>
                <p className="card-text text-muted">by {book.author}</p>
                <div className="mt-auto">
                  <button className="btn btn-outline-primary w-100 mb-2" onClick={() => handleAddEditNote(book)}>
                    {book.note ? 'Edit Note' : 'Add Note'}
                  </button>
                  {book.note && (
                    <button className="btn btn-outline-dark w-100" onClick={() => handleToggleNote(book)}>
                      {viewingBookId === book.id ? 'Hide Note' : 'Show Note'}
                    </button>
                  )}
                </div>
                {editingBookId === book.id && (
                  <div className="mt-3">
                    <textarea
                      className="form-control"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows="3"
                      placeholder="Add your notes here..."
                    ></textarea>
                    <div className="d-flex justify-content-between mt-2">
                      <button className="btn btn-success" onClick={() => handleSaveNote(book.id)}>
                        Save Note
                      </button>
                      <button className="btn btn-outline-secondary ms-2" onClick={handleCancelEdit}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {viewingBookId === book.id && (
                  <div className="mt-3">
                    <h6>Note</h6>
                    <p>{book.note}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
