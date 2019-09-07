import React, { Component } from 'react';

import { Terminal } from 'xterm';
import * as fit from 'xterm/dist/addons/fit/fit';
import 'xterm/dist/xterm.css';
import './index.less';

export default class XTerm extends Component {
    static displayName = 'XTerm';

    constructor(props) {
      super(props);
      this.state = {};
      this.getTerm = this.getTerm.bind(this);
    }

    componentDidMount() {
      Terminal.applyAddon(fit);
      const { id } = this.props;
      const terminalContainer = document.getElementById(id);
      this.term = new Terminal({ cursorBlink: true });
      this.term.open(terminalContainer);
      this.term.fit();
      this.term.write('connecting to server...');
    }


    getTerm() {
      return this.term;
    }

    render() {
      return <div id={this.props.id} style={{ height: 500 }} />;
    }
}
