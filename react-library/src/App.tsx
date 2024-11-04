import React, { useEffect, useState } from 'react';
import BookList from './bookList';

const App: React.FC = () => {
  

  const [isDivVisible, setIsDivVisible] = useState(false);

  const toogleDivList = () => {
    setIsDivVisible(prevState => !prevState);
  };

  const toogleDivOptions = () => {
    setIsDivVisible(prevState => !prevState);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <p className="navbar-brand">Library</p>
        <span className="navbar-toggler-icon"></span>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <button className="nav-link active" onClick={toogleDivList}>
              Book list
           </button>
          {isDivVisible && (
            <div className='listDiv'>
                <p className='insideDivP'> Book List</p>
                <div className='insideDivListDiv'> 
                  <BookList />
                </div>
            </div>
          )}
          </li>
      </ul>
        </div>
      </div>
    </nav>
  );
};

export default App;