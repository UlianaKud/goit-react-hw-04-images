import { useState, useEffect } from 'react';
import scss from './imageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { fetchPhotos } from '../../api.js';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';

const ImageGallery = ({ searchName }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [showSpinner, setshowSpinner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const openModal = src => {
    setIsModalOpen(true);
    setImageSrc(src);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setImageSrc(null);
  };

  const getImages = async () => {
    setshowSpinner(true);
    setError('');
    try {
      const result = await fetchPhotos(searchName, page);
      if (!result?.totalHits) {
        setError(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (result?.hits) {
        setImages([...images, ...result.hits]);
        setTotalHits(result.totalHits);
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
      setError('Server error');
    } finally {
      setshowSpinner(false);
    }
  };
  useEffect(() => {
    setPage(1);
    setImages([]);
  }, [searchName]);

  useEffect(() => {
    if (searchName && page === 1) {
      getImages(page);
    }
  }, [page, searchName]);

  return (
    <div className={scss.wrapper}>
      {error && <p className={scss.message}>{error}</p>}
      {showSpinner && <Loader />}
      {images.length > 0 && (
        <ul className={scss.gallery}>
          {images.map(image => {
            return (
              <ImageGalleryItem
                openModal={openModal}
                key={image.id}
                imageUrl={image.webformatURL}
                imageSrc={image.largeImageURL}
                imageName={image.tags}
              />
            );
          })}
        </ul>
      )}
      {images?.length > 0 && totalHits > images.length && (
        <Button onClick={getImages} />
      )}
      {isModalOpen && <Modal modalUrl={imageSrc} onClose={handleCloseModal} />}
    </div>
  );
};

export default ImageGallery;
ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
