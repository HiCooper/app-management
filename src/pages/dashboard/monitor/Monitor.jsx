import React, {Component} from 'react';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';

export default class Monitor extends Component {
  static displayName = 'Monitor';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        Monitor page
      </PageHeaderWrapper>
    );
  }
}
