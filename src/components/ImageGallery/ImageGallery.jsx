import { Component } from 'react';
import scss from './imageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { fetchPhotos } from '../../api.js';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  state = {
    images: [],
    error: '',
    showSpinner: false,
    isModalOpen: false,
    imageSrc: null,
    page: 1,
  };

  openModal = src => this.setState({ isModalOpen: true, imageSrc: src });

  handleCloseModal = () =>
    this.setState({ isModalOpen: false, imageSrc: null });

  getImages = async () => {
    this.setState({ showSpinner: true, error: '' });
    try {
      const images = await fetchPhotos(this.props.searchName, this.state.page);
      if (!images?.totalHits) {
        this.setState({
          error:
            'Sorry, there are no images matching your search query. Please try again.',
        });
      }

      images?.hits &&
        this.setState({
          images: [...this.state.images, ...images.hits],
          totalHits: images.totalHits,
          page: this.state.page + 1,
        });
    } catch (error) {
      this.setState({ error: 'Server error' });
    } finally {
      this.setState({ showSpinner: false });
    }
  };

  async componentDidUpdate(prevProps) {
    const { searchName } = this.props;

    if (prevProps.searchName !== searchName) {
      this.setState({page: 1, images: []}, () => this.getImages(this.state.page));
    }
  }
  render() {
    const { images, error, showSpinner, isModalOpen, totalHits, imageSrc } = this.state;
 
      return (
      <div className={scss.wrapper}>
        {error && <p className={scss.message}>{error}</p>}
        {showSpinner && <Loader />}
        {images.length > 0 && (
          <ul className={scss.gallery}>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  openModal={this.openModal}
                  key={image.id}
                  imageUrl={image.webformatURL}
                  imageSrc={image.largeImageURL}
                  imageName={image.tags}
                />
              );
            })}
          </ul>
        )}
        {images?.length > 0 && totalHits > images.length && <Button onClick={this.getImages} />}
        {isModalOpen && (
          <Modal
            modalUrl={imageSrc}
            onClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;
ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
