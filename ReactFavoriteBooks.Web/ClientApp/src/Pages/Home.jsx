import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
  return (
      <div className="text-center">
        <div className="p-5 mb-4 bg-light rounded-3 mt-5">
          <h1 className="display-4">Welcome to React Favorite Books!</h1>
          <p className="lead">Your personal library tracker. Search for books, add them to your personal library, and
            manage your collection with ease.</p>
          <hr className="my-4"/>
          <p>Ready to start building your personal library? Click the button below to begin searching for books.</p>
          <Link to={'/search'}>
            <button className="btn btn-primary btn-lg">Search for Books</button>
          </Link>
        </div>
      </div>
  );
}

export default Home;
