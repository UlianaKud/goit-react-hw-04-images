import { useState } from 'react';
import Notiflix from 'notiflix';
import { ReactComponent as Icon } from '../../icons/icons8-search.svg';
import scss from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [inputData, setInputData] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setInputData(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputData.trim('')) {
      Notiflix.Notify.failure('Oops, request is empty');
      return;
    }
    onSubmit(inputData);
    setInputData('');
  };
  return (
    <header className={scss.searchbar}>
      <form className={scss.form} onSubmit={handleSubmit}>
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
          value={inputData}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};
export default Searchbar;
