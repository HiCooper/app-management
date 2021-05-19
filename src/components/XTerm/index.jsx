import React, { Component } from 'react';

import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './index.less';

export default class XTerm extends Component {
  static displayName = 'XTerm';

  constructor(props) {
    super(props);
    this.state = {};
    this.getTerm = this.getTerm.bind(this);
  }

  componentDidMount() {
    // const fitAddon = new FitAddon();
    // Terminal.loadAddon(fitAddon);
    const { id } = this.props;
    const terminalContainer = document.getElementById(id);
    this.term = new Terminal({ cursorBlink: true });
    this.term.open(terminalContainer);
    // fitAddon.fit();
    this.term.write('connecting to server...');
  }


  getTerm() {
    return this.term;
  }

  render() {
    return <div id={this.props.id} style={{ height: 500 }} />;
  }
}
