import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';

const ChannelListItem = (props) => {
  const { channel: selectedChannel, onClick, channel } = props;
  return (
    <a className={classnames({ selected: channel === selectedChannel })}
       onClick={() => onClick(channel)}>
      <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '10px'}}>
        <p>{channel.name}</p>
      </li>
    </a>
  );
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChannelListItem;