import React, { Component } from 'react';
import PageHeaderWrapper from '../../components/PageHeaderWrapper';

export default class Setting extends Component {
  static displayName = 'Setting';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        Setting page
      </PageHeaderWrapper>
    );
  }
}
