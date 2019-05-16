import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v4';
import Login from './Login';
import io from 'socket.io-client';
 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      socket: io(),
    }
  }

  handleLogin = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login',
      payload: {
        userId: uuid(),
        username: values.username,
      }
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
        <div>麒麟小马</div>
        <Login {...modalProps} />
      </Fragment>
    )
  }
}