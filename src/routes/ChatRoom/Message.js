import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    const { msgType, msgUser, action, time, isMe } = this.props;
    return (
      msgType === 'system' ? 
    <div className='system-message'>
      {msgUser} {action === 'login' ? '进入了聊天室' : '离开了聊天室' }
      <span className="time">&nbsp;{time}</span>
    </div>
    : <div className={isMe ? 'my-message' : 'other-message'}>
      <p className="time">
          <span>{msgUser}</span> {time}
        </p>
        <div className="message-content">{action}</div>
    </div>
    )
  }
}