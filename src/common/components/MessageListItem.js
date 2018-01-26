import React, { PropTypes } from 'react';

export default class MessageListItem extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };
  handleClick(user) {
    this.props.handleClickOnUser(user);
  }
  render() {
    const { message } = this.props;
    return (
      <li>
        <span>
          <b className="dashName" onClick={this.handleClick.bind(this, message.user)}>
            {message.user.username}
          </b>
          <i onClick={this.handleClick.bind(this, message.user)} className="dashTime">
            {message.time}
          </i>
        </span>
        <p className='dashMess'>
          {message.text}
        </p>
      </li>
    );
  }
}
