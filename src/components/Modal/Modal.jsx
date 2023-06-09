import { useEffect } from 'react';
import scss from './modal.module.scss';
import PropTypes from 'prop-types';

const Modal = ({ onClose, modalUrl }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      console.log('handleKeyDown');
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    onClose();
  };
  return (
    <div className={scss.overlay} onClick={handleClose}>
      <div className={scss.modal}>
        <img className={scss.img} src={modalUrl} alt="#" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  modalUrl: PropTypes.string.isRequired,
};
