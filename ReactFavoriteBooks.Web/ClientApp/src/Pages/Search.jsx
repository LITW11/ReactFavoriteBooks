import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from "../AuthContext.jsx";

const Search = () => {

  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  
  const loadFavoriteBooks = async () => {
    if(!isLoggedIn) {
      return;
    }
    
    const { data } = await axios.get('/api/Books/GetFavorites');
    setFavoriteBooks(data);
  }
  
  useEffect(() => {
    loadFavoriteBooks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.get(`/api/Books/search?query=${query}`);
    setResults(data);
    setLoading(false);
  };
  
  const onAddToFavoritesClick = async (book) => {
    await axios.post('/api/Books/AddToFavorites', book);
    await loadFavoriteBooks();
  }
  
  const onRemoveFromFavoritesClick = async (favoriteBook) => {
    await axios.post('/api/Books/removefromfavorites', {favoriteBookId: favoriteBook.id});
    await loadFavoriteBooks();
  }

  const getButton = (book) => {
    if (!isLoggedIn) {
      return <button disabled className="btn btn-success mt-auto">Sign In to Add to Favorites</button>
    }
    const matchingFavorite = favoriteBooks.find(f => f.openLibraryId === book.id);
    if(matchingFavorite) {
      return <button className="btn btn-danger mt-auto" onClick={() => onRemoveFromFavoritesClick(matchingFavorite)}>Remove from Favorites</button>  
    }
    return <button className="btn btn-success mt-auto" onClick={() => onAddToFavoritesClick(book)}>Add to Favorites</button>
  }

  return (
      <div className="container mt-5">
        <h2>Search for Books</h2>
        <form onSubmit={handleSearch}>
          <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Enter book title, author, or ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </form>
        {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
        )}
        <div className="row">
          {!loading && results.map(book => (
              <div className="col-md-4 mb-3" key={book.id}>
                <div className="card h-100">
                  <div className="d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                    <img src={book.coverUrl} className="card-img-top" alt={book.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">by {book.author}</p>
                    {getButton(book)}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default Search;
