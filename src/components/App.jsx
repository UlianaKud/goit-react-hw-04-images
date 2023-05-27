import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchName: '',
  };

  handleSearch = data => {
    this.setState({ searchName: data });
  };

  render() {
    const { searchName } = this.state;

    return (
      <div
        style={{
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchName={searchName} />
      </div>
    );
  }
}
