import React from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from "../AuthContext.jsx";

const Layout = ({children}) => {
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  return (
      <div>
        <header>
          <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
            <div className="container">
              <a className="navbar-brand">ReactFavoriteBooks</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse"
                      data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                      aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                <ul className="navbar-nav flex-grow-1">
                  <li className="nav-item">
                    <Link to="/" className='nav-link text-light'>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/search" className='nav-link text-light'>Search</Link>
                  </li>
                  {!isLoggedIn && <>
                    <li className="nav-item"><Link to="/signup" className='nav-link text-light'>Sign up</Link></li>
                    <li className="nav-item"><Link to="/login" className='nav-link text-light'>Log In</Link></li>
                  </>}
                  {isLoggedIn &&
                      <>
                        <li className="nav-item">
                          <Link to="/favorites" className='nav-link text-light'>My Favorites</Link>
                        </li>
                        <li className="nav-item"><Link to="/logout" className='nav-link text-light'>Logout</Link></li>
                      </>
                  }

                </ul>
              </div>
            </div>
          </nav>
        </header>
        <div className="container mt-5">
          <div style={{marginTop: 80}}>
            {children}
          </div>
        </div>
      </div>
  )
}

export default Layout;