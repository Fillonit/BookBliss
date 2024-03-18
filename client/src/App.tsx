import React from 'react';
import BookList from './components/Book/BookList'; // Assuming BookList.tsx is in the same directory as App.tsx
import Header from './components/Header/header';
const App: React.FC = () => {
  return (
    <div className="App" style={{ backgroundColor: '#141414' }}> {/* Added inline style for background color */}
      <Header />
	  <BookList />
	  
    </div>
  );
}

export default App;
