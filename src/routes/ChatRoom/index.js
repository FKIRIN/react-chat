import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Tree, Input, Button } from 'antd';

import { generateTime, generateMsgId } from '../utils/utils';
import { updateMsg, updateSysMsg } from '../../action/chatting';

import PageHeader from './PageHeader';
import Message from './Message';
// import Content from './Content';

const { TreeNode } = Tree;
const { TextArea } = Input;
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      init: false,
    };
  }

  componentDidMount() {
    const { chatState: { socket } } = this.props;
    if (socket) {
      socket.on('login', o => {
        this.handleUpdateSysMsg(o, 'login');
      })
      socket.on('logout', o => {
        this.handleUpdateSysMsg(o, 'logout');
      })

      socket.on('message', obj => {
        this.handleUpdateMsg(obj)
      });
    }
  }

  // componentWillReceiveProps(nextProps, state) {
  //   const { chatState: { socket } } = nextProps;
  //   if (socket) {
  //     socket.on('login', o => {
  //       this.handleUpdateSysMsg(o, 'login');
  //     })
  //     socket.on('logout', o => {
  //       this.handleUpdateSysMsg(o, 'logout');
  //     })
  //     socket.on('message', obj => {
  //       this.handleUpdateMsg(obj)
  //     });
  //   }
  // }

  handleMessageChange = (e) => {
    this.setState({
      message: e.target.value,
      init: true 
    })
  }

  handleSendMessage = (e) => {
    const { chatState: { socket, username, userId } } = this.props;
    const { message } = this.state;
    const sendInfo = { 
      userId,
      username,
      message,
    }
    socket.emit('message', sendInfo);
    this.setState({ message: '', init: true })
  }

  handleUpdateSysMsg = (o, action) => {
    const { updateSysMsg } = this.props;
    const newMsg = { 
      type: 'system',
      username: o.user.username,
      userId: o.user.userId,
      action: action,
      msgId: generateMsgId(),
      time: generateTime(),
    };
    updateSysMsg(
      { 
        onlineCount: o.onlineCount,
        onlineUsers: o.onlineUsers,
        message: newMsg, 
      });
  }

  handleUpdateMsg = (obj) => {
    const { updateMsg } = this.props; 
    const newMsg = { 
      type: 'chat',
      username: obj.username,
      userId: obj.userId,
      action: obj.message,
      msgId: generateMsgId(),
      time: generateTime() 
    };
    updateMsg({ message: newMsg });
  }

  renderUserList = (obj) => {
    let treeList = [];
    if (obj) {
      for(let [key, value] of Object.entries(obj)) {
        treeList.push({id: key, name: value});
      }
      if (Array.isArray(treeList) && treeList.length > 0) {
        return treeList.map(node => {
          return (<TreeNode title={node.name} key={node.id} />)
        })
      }
    }
  }

  render() {
    const { dispatch, chatState } = this.props;
    const { message } = this.state;
    const { username, messageList, userId, onlineUsers } = chatState;
    const headerProps = {
      username,
      dispatch,
    };
    // const contentProps = {
    //   chatState,
    //   onSendMessage: this.handleSendMessage,
    // }
    return (
      <Fragment>
        <PageHeader {...headerProps} />
        <div className='chat-content'>
          <div className='userList'>
            <Tree>
              <TreeNode title='在线聊天成员' key='0'>
                {this.renderUserList(onlineUsers)}
              </TreeNode>
            </Tree>
          </div>
          <div className="chat-message">
            <div className='infoList'>
              {messageList.map(item => (
                <Message
                key={item.msgId}
                msgType={item.type} 
                msgUser={item.username} 
                action={item.action} 
                isMe={userId === item.userId} 
                time={item.time} 
                />
              ))}
            </div>
            <div className='sendArea'>
              <div className='writeArea'>
                <TextArea value={message} onChange={this.handleMessageChange} rows={8} />
              </div>
              <div className='send-btn'>
                <Button onClick={this.handleSendMessage} type='primary'>发送</Button>
              </div>
            </div>
          </div>
        </div>
        {/* <Content {...contentProps} /> */}
      </Fragment>
    )
  }
}
export default connect(
  (state)=>({chatState: state.chat}),
  {
    updateMsg,
    updateSysMsg,
  }
)(ChatRoom)