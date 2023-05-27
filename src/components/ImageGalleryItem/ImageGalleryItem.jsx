import scss from './imageGalleryItem.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ openModal, imageName, imageUrl, imageSrc }) => {
  const handleClick = () => {
    openModal(imageSrc);
  };
  return (
    <>
      <li className={scss.galleryItem} onClick={handleClick}>
        <img className={scss.img} src={imageUrl} alt={imageName} />
      </li>
    </>
  );
};

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
};
