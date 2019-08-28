import React, { Component } from 'react';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';

export default class Workplace extends Component {
  static displayName = 'Workplace';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        Workplace page
      </PageHeaderWrapper>
    );
  }
}
