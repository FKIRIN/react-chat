import React, { Component, Fragment } from 'react';
import { Tree, Input, Button } from 'antd';
import Message from './Message';


import './index.less';
const { TreeNode } = Tree;
const { TextArea } = Input;

// const Message = (props) => {
//   return (
//     props.msgType === 'system' ? 
//     <div className='system-message'>
//       {props.msgUser} {props.action === 'login' ? '进入了聊天室' : '离开了聊天室' }
//       <span className="time">&nbsp;{props.time}</span>
//     </div>
//     : <div className={props.isMe ? 'my-message' : 'other-message'}>
//       <p className="time">
//           <span>{props.msgUser}</span> {props.time}
//         </p>
//         <div className="message-content">{props.action}</div>
//     </div>
//   )
// }

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  

  handleMessageChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  render() {
    const { onSendMessage, chatState: { messageList = [] } } = this.props;
    const { message, userId } = this.state;
    return (
      <Fragment>
        <div className='chat-content'>
          <div className='userList'>
            <Tree>
              <TreeNode title='在线聊天成员' key='0'>
                <TreeNode title='小马' key='1' />
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
                <TextArea onChange={this.handleMessageChange} rows={8} />
              </div>
              <div className='send-btn'>
                <Button onClick={() => onSendMessage(message)} type='primary'>发送</Button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}