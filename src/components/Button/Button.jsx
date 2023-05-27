import scss from './button.module.scss';

const Button = ({ onClick }) => {
  const handleClick = e => {
    onClick(e);
  };

  return (
    <button className={scss.button} onClick={handleClick}>
      Load more
    </button>
  );
};

export default Button;
