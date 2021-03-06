import React, { Component, PropTypes } from 'react';
import ChannelListItem from './ChannelListItem';
import ChannelListModalItem from './ChannelListModalItem';
import { Modal, Glyphicon, Input, Button } from 'react-bootstrap';
import * as actions from '../actions/actions';
import uuid from 'node-uuid';

export default class Channels extends Component {

  static propTypes = {
    channels: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      addChannelModal: false,
      channelName: '',
      moreChannelsModal: false
    };
  }
  handleChangeChannel(channel) {
    if(this.state.moreChannelsModal) {
      this.closeMoreChannelsModal();
    }
    this.props.onClick(channel);
  }
  openAddChannelModal(event) {
    event.preventDefault();
    this.setState({addChannelModal: true});
  }
  closeAddChannelModal(event) {
    event.preventDefault();
    this.setState({addChannelModal: false});
  }
  handleModalChange(event) {
    this.setState({channelName: event.target.value});
  }
  handleModalSubmit(event) {
    const { channels, dispatch, socket } = this.props;
    event.preventDefault();
    if (this.state.channelName.length < 1) {
      this.refs.channelName.getInputDOMNode().focus();
    }
    if (this.state.channelName.length > 0 && channels.filter(channel => {
      return channel.name === this.state.channelName.trim();
    }).length < 1) {
      const newChannel = {
        name: this.state.channelName.trim(),
        id: `${Date.now()}${uuid.v4()}`,
        private: false
      };
      dispatch(actions.createChannel(newChannel));
      this.handleChangeChannel(newChannel);
      socket.emit('new channel', newChannel);
      this.setState({channelName: ''});
      this.closeAddChannelModal();
    }
  }
  validateChannelName() {
    const { channels } = this.props;
    if (channels.filter(channel => {
      return channel.name === this.state.channelName.trim();
    }).length > 0) {
      return 'error';
    }
    return 'success';
  }
  openMoreChannelsModal(event) {
    event.preventDefault();
    this.setState({moreChannelsModal: true});
  }
  closeMoreChannelsModal(event) {
    event.preventDefault();
    this.setState({moreChannelsModal: false});
  }
  createChannelWithinModal() {
    this.closeMoreChannelsModal();
    this.openAddChannelModal();
  }
  render() {
    const { channels, messages } = this.props;
    const filteredChannels = channels.slice(0, 8);
    const moreChannelsBoolean = channels.length > 8;
    const restOfTheChannels = channels.slice(8);

    const newChannelModal = (
      <div>
        <Modal key={1} show={this.state.addChannelModal} onHide={::this.closeAddChannelModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={::this.handleModalSubmit} >
              <Input
                ref="channelName"
                type="text"
                maxLength="30"
                help={this.validateChannelName() === 'error' && 'A channel with that name already exists!'}
                bsStyle={this.validateChannelName()}
                hasFeedback
                name="channelName"
                autoFocus="true"
                placeholder="Enter the channel name"
                value={this.state.channelName}
                onChange={::this.handleModalChange}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={::this.closeAddChannelModal}>Cancel</Button>
            <Button bsStyle="success" disabled={this.validateChannelName() === 'error' && 'true'} onClick={::this.handleModalSubmit} type="submit">
              Create Channel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
    const moreChannelsModal = (
      <div style={{background: 'black'}}>
        <Modal key={2} show={this.state.moreChannelsModal} onHide={::this.closeMoreChannelsModal}>
          <Modal.Header closeButton >
            <Modal.Title>More Channels</Modal.Title>
            <a onClick={::this.createChannelWithinModal}>
              Create a channel
            </a>
          </Modal.Header>
          <Modal.Body>
            <ul style={{height: 'auto', margin: '0', overflowY: 'auto', padding: '0'}}>
              {restOfTheChannels.map(channel =>
                <ChannelListModalItem channel={channel} key={channel.id} onClick={::this.handleChangeChannel} />
                )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={::this.closeMoreChannelsModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
    return (
      <section>
        <div>
          <span style={{paddingLeft: '10px', fontSize: '15px'}}>
            Channels
            <Button onClick={::this.openAddChannelModal} style={{fontSize: '0.8em', 'background': 'Transparent', marginLeft: '2.8em', 'backgroundRepeat': 'noRepeat', 'border': 'none', 'cursor': 'pointer', 'overflow': 'hidden', 'outline': 'none'}}>
              <Glyphicon glyph="plus" />
            </Button>
          </span>
        </div>
          {newChannelModal}
        <div>
          <ul className="channelList">
            {filteredChannels.map(channel =>
              <ChannelListItem className="channelListItem" messageCount={messages.filter(msg => {
                return msg.channelID === channel.name;
              }).length} channel={channel} key={channel.id} onClick={::this.handleChangeChannel} />
              )}
          </ul>
          <Button style={{width: '200px'}}>
            {moreChannelsBoolean && <a onClick={::this.openMoreChannelsModal}> + {channels.length - 8} more...</a>}
            {moreChannelsModal}
          </Button>
        </div>
      </section>
    );
  }
}
