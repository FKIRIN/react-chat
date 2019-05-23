import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

import Login from './Login';
import io from 'socket.io-client';
import ChatRoom from './ChatRoom';
import { login } from '../action/chatting';
 

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      socket: io(),
    }
  }

  handleLogin = (values) => {
    const { chatState: { socket }, login } = this.props;
    login({
      userId: uuid(),
      username: values.username,
    });
    this.handleModalVisible(false);
    socket.emit('login', { 
      userId: uuid(),
      username: values.username, 
    })
  }

  handleModalVisible = (flag) => {
    this.setState({
      visible: !!flag,
    })
  }

  render() {
    const { visible } = this.state;
    const modalProps = {
      visible,
      onOk: this.handleLogin,
      onCancel: () => this.handleModalVisible(false),
    };
    return (
      <Fragment>
        <ChatRoom />
        <Login {...modalProps} />
      </Fragment>
    )
  }
}

export default  connect(
  (state)=>({chatState: state.chat}),
  {
    login,
  }
)(App)