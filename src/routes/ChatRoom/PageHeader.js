import React, { Component } from 'react';
import { Button } from 'antd';

import './index.less';

export default class PageHeader extends Component {
  render() {
    const { username = '马马' } = this.props;

    return (
      <div className='page-header'>
        <div className='header-user'>
          <span>麒麟小马的聊天室 | {username} </span>
        </div>
        <div className='logout'>
          <Button type='ghost' onClick={() => window.location.reload()}>退出登陆</Button>
        </div>
      </div>
    );
  }
}