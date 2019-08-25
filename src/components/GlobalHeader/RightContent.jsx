import React, { Component } from 'react';
import './index.less';

import AvatarDropdown from './AvatarDropdown';

export default class RightContent extends Component {
  static displayName = 'RightContent';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="right">
        <AvatarDropdown />
      </div>
    );
  }
}
