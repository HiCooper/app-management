import React, { Component } from 'react';
import './style.less';

export default class index extends Component {
    static displayName = 'index';

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div className="app-add-home">
                index page
        </div>
      );
    }
}
