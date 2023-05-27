import { Component } from 'react';
import Notiflix from 'notiflix';
import { ReactComponent as Icon } from '../../icons/icons8-search.svg';
import scss from './searchbar.module.scss'

class Searchbar extends Component {
  state = {
    inputData: '',
    showSpinner: false,
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ inputData: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { inputData } = this.state;
    this.setState({ showSpinner: true });
    if (!inputData.trim('')) {
      Notiflix.Notify.failure('Oops, request is empty');
      return;
    }
    this.props.onSubmit(inputData);
    this.setState({ inputData: '' });
  };

  render() {
    return (
      <header className={scss.searchbar}>
        <form className={scss.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={scss.button}>
            <span>
              <Icon />
            </span>
          </button>

          <input
            className={scss.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputData}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
