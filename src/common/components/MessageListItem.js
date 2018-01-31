import React, { PropTypes } from 'react';
import { Media } from 'react-bootstrap';

// Properties of messages sent. Ex From, date, textinput
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

        <Media style={{maxWidth: '400px',paddingLeft:'20px'}}>
          <Media.Left>
            {/*Temporary img*/}
            <img width={64} height={64} src="https://react-bootstrap.github.io/thumbnail.png" alt="thumbnail" />
          </Media.Left>
          <Media.Body>
            <Media.Heading>
              <b className="dashName" onClick={this.handleClick.bind(this, message.user)}>
                {message.user.username}
              </b>
              <i onClick={this.handleClick.bind(this, message.user)} className="dashTime">
                {message.time}
              </i>

            </Media.Heading>
            <p className='dashMess'>
              {message.text}
            </p>
          </Media.Body>
        </Media>
        <hr/>
      </li>

    );
  }
}
