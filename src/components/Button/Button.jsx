import { Component } from 'react';
import scss from './button.module.scss'


class Button extends Component {

  handleClick = (e) => {
    this.props.onClick(e);
  }
  
  render() {
    return <button className={scss.button} onClick={this.handleClick}>Load more</button>;
  }
}

export default Button;
