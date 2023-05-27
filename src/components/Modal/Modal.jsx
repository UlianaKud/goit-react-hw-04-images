import { Component } from 'react';
import scss from './modal.module.scss';
import PropTypes from 'prop-types';
class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.key === "Escape") {
      this.props.onClose();
    }
  };

  handleClose = e => {
    if (e.target.nodeName === "IMG") {
        return;
      }
    this.props.onClose();
  };
  render() {
    const { modalUrl } = this.props;
    return (
      <div className={scss.overlay} onClick={this.handleClose}>
        <div className={scss.modal}>
          <img className={scss.img} src={modalUrl} alt="#" />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalUrl: PropTypes.string.isRequired,
}
