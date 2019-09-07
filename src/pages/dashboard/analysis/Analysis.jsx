import React, {Component} from 'react';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';

export default class Analysis extends Component {
  static displayName = 'Analysis';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        Analysis page
      </PageHeaderWrapper>
    );
  }
}
