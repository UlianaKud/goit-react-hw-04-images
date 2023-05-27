import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchName, setSearchName] = useState('');

  const handleSearch = data => {
    setSearchName(data);
  };

  return (
    <div
      style={{
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery searchName={searchName} />
    </div>
  );
};
